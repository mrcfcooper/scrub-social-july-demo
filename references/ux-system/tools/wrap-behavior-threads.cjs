#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const UX_ROOT = path.resolve(__dirname, '..');
const FULL_APP_ROUTE_PACKET_ROOT = path.join(REPO_ROOT, 'frontend/app-behavior-docs/route-packets');

const ROW_ARRAY_CLASSIFICATION = {
  phaseAudits: ['context', 'audit', 'phaseAudits'],
  sourceTrace: ['context', 'evidence', 'sourceTrace'],
  behaviorSurfaces: ['context', 'evidence', 'behaviorSurfaces'],
  userActions: ['context', 'evidence', 'userActions'],
  behaviorBranches: ['context', 'evidence', 'behaviorBranches'],
  hiddenUx: ['context', 'evidence', 'hiddenUx'],
  rolePermissionBehavior: ['context', 'evidence', 'rolePermissionBehavior'],
  expectedBasics: ['context', 'evidence', 'expectedBasics'],
  behaviorMatrices: ['context', 'evidence', 'behaviorMatrices'],
  currentUxRequirements: ['behavior', 'documentedCurrent'],
  observableScenarios: ['context', 'proof', 'observableScenarios'],
  coverageRows: ['context', 'proof', 'coverageRows'],
  followUpItems: ['context', 'audit', 'followUpItems'],
  auditDebtItems: ['context', 'audit', 'auditDebtItems'],
  pendingDecisionRefs: ['issues', 'pendingDecisions'],
  rebuildReadinessRehearsals: ['context', 'proof', 'rebuildReadiness'],
  otherRows: ['context', 'audit', 'otherRows']
};

const IDENTITY_KEYS = new Set(['id', 'packageId', 'coverageIndexId']);

function parseArgs(argv) {
  const options = {
    mode: 'check',
    scope: 'full-app-audit',
    force: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--check') options.mode = 'check';
    else if (arg === '--write') options.mode = 'write';
    else if (arg === '--force') options.force = true;
    else if (arg === '--scope') {
      options.scope = argv[index + 1];
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (options.scope !== 'full-app-audit') throw new Error(`Unsupported --scope ${options.scope}`);
  return options;
}

function walkFiles(root, predicate) {
  if (!fs.existsSync(root)) return [];
  const results = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) results.push(...walkFiles(entryPath, predicate));
    else if (predicate(entryPath)) results.push(entryPath);
  }
  return results.sort();
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value).sort()) result[key] = stable(value[key]);
    return result;
  }
  return value;
}

function fingerprint(value) {
  return JSON.stringify(stable(value));
}

function slug(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9._:-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function isThread(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && value.schema === 'tgn.ux-behavior-thread.v1' && value.itemType === 'uxBehaviorThread';
}

function isRow(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && typeof value.id === 'string' && !isThread(value);
}

function threadChildEntries(thread) {
  const entries = [];
  for (const sectionName of ['behavior', 'relationships', 'issues']) {
    const section = thread[sectionName];
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue;
    for (const [bucket, rows] of Object.entries(section)) {
      if (Array.isArray(rows)) rows.forEach((row) => entries.push({ sectionPath: [sectionName, bucket], row }));
    }
  }

  const context = thread.context || {};
  for (const groupName of ['evidence', 'proof', 'audit']) {
    const group = context[groupName];
    if (!group || typeof group !== 'object' || Array.isArray(group)) continue;
    for (const [bucket, rows] of Object.entries(group)) {
      if (Array.isArray(rows)) rows.forEach((row) => entries.push({ sectionPath: ['context', groupName, bucket], row }));
    }
  }
  return entries;
}

function extractSingleThreadChild(thread) {
  const entries = threadChildEntries(thread);
  if (entries.length !== 1) {
    throw new Error(`${thread.id}: expected exactly one child row, found ${entries.length}`);
  }
  return entries[0];
}

function classify(row, rowArrayName) {
  if (rowArrayName === 'otherRows' && String(row.id || '').startsWith('route-completion-proof:')) {
    return ['context', 'proof', 'routeCompletionProof'];
  }

  if (row.itemType === 'uxBehaviorMapping' || row.itemType === 'uxCurrentDesiredMapping') return ['relationships', 'mappings'];
  if (row.itemType === 'uxRuntimeDrift') return ['issues', 'runtimeDrift'];
  if (row.itemType === 'uxPendingDecision' || row.schemaRole === 'pending-decision-ref') return ['issues', 'pendingDecisions'];
  if (row.uxQualityObservation) return ['issues', 'qualityObservations'];
  if (row.uxQualityAssessment || row.currentUxAssessment) return ['issues', 'qualityAssessments'];

  if (row.authority === 'governing' || row.status === 'confirmed-governing') return ['behavior', 'governing'];
  if (row.authority === 'observed-current' || row.status === 'observed-current') return ['behavior', 'observedCurrent'];
  if (row.authority === 'documented-current' || row.status === 'documented-current') return ['behavior', 'documentedCurrent'];
  if (row.mode === 'confirmed-current') return ['behavior', 'confirmedCurrent'];
  if (row.mode === 'desired' || row.mode === 'ideal') return ['behavior', 'desired'];
  if (row.mode === 'proposed' || row.status === 'new-requested' || row.status === 'approved-change') return ['behavior', 'proposed'];
  if (row.mode === 'pending-confirmation' || row.status === 'pending-confirmation') return ['behavior', 'pendingConfirmation'];
  if (row.mode === 'rejected' || row.status === 'do-not-preserve') return ['behavior', 'rejected'];
  if (row.mode === 'deprecated' || row.status === 'deprecated') return ['behavior', 'superseded'];
  if (row.status === 'out-of-scope') return ['behavior', 'outOfScope'];

  const byArray = ROW_ARRAY_CLASSIFICATION[rowArrayName];
  if (byArray) return byArray;
  throw new Error(`No behavior-thread classification for row array '${rowArrayName}' row '${row.id}'`);
}

function setAtPath(target, sectionPath, row) {
  let cursor = target;
  for (let index = 0; index < sectionPath.length - 1; index += 1) {
    const key = sectionPath[index];
    if (!cursor[key]) cursor[key] = {};
    cursor = cursor[key];
  }
  cursor[sectionPath[sectionPath.length - 1]] = [row];
}

function makeThread(row, filePath, rowPath, rowArrayName, idCounts, packetId) {
  const relativeFile = path.relative(REPO_ROOT, filePath);
  const duplicateSafeSuffix = (idCounts.get(row.id) || 0) > 1 ? `.${slug(relativeFile.replace(/\.json$/, ''))}.${slug(rowPath)}` : '';
  const thread = {
    schema: 'tgn.ux-behavior-thread.v1',
    itemType: 'uxBehaviorThread',
    id: `ux.behavior-thread.${row.id}${duplicateSafeSuffix}`
  };
  setAtPath(thread, classify(row, rowArrayName), row);
  return thread;
}

function collectPacketFiles() {
  return walkFiles(FULL_APP_ROUTE_PACKET_ROOT, (filePath) => filePath.endsWith('index.packet.json'));
}

function collectRowsFromDocument(document, filePath) {
  const rows = [];
  for (const [rowArrayName, value] of Object.entries(document.rows || {})) {
    if (!Array.isArray(value)) continue;
    value.forEach((entry, index) => {
      const rowPath = `rows.${rowArrayName}.${index}`;
      if (isThread(entry)) {
        const child = extractSingleThreadChild(entry);
        rows.push({
          filePath,
          packetId: document.packetId,
          rowArrayName,
          rowPath,
          wrapped: true,
          thread: entry,
          row: child.row,
          sectionPath: child.sectionPath,
          fingerprint: fingerprint(child.row)
        });
      } else if (isRow(entry)) {
        rows.push({
          filePath,
          packetId: document.packetId,
          rowArrayName,
          rowPath,
          wrapped: false,
          row: entry,
          sectionPath: classify(entry, rowArrayName),
          fingerprint: fingerprint(entry)
        });
      } else if (entry && typeof entry === 'object') {
        throw new Error(`${path.relative(REPO_ROOT, filePath)} ${rowPath}: unsupported object without row id`);
      }
    });
  }
  return rows;
}

function countIds(rows) {
  const counts = new Map();
  for (const row of rows) counts.set(row.row.id, (counts.get(row.row.id) || 0) + 1);
  return counts;
}

function inventoryKey(row) {
  return `${path.relative(REPO_ROOT, row.filePath)}#${row.rowPath}#${row.row.id}`;
}

function compareInventories(beforeRows, afterRows) {
  const before = new Map(beforeRows.map((row) => [inventoryKey(row), row]));
  const after = new Map(afterRows.map((row) => [inventoryKey(row), row]));
  const errors = [];

  for (const key of before.keys()) {
    if (!after.has(key)) errors.push(`Lost row ${key}`);
  }
  for (const key of after.keys()) {
    if (!before.has(key)) errors.push(`Added unexpected row ${key}`);
  }
  for (const [key, beforeRow] of before.entries()) {
    const afterRow = after.get(key);
    if (!afterRow) continue;
    if (afterRow.packetId !== beforeRow.packetId) errors.push(`Moved packet for ${key}`);
    if (afterRow.rowArrayName !== beforeRow.rowArrayName) errors.push(`Moved row array for ${key}`);
    if (afterRow.fingerprint !== beforeRow.fingerprint) errors.push(`Semantic row change for ${key}`);
  }
  return errors;
}

function validateThreadIds(rows, idCounts) {
  const seen = new Map();
  const errors = [];
  for (const row of rows) {
    const thread = row.wrapped ? row.thread : makeThread(row.row, row.filePath, row.rowPath, row.rowArrayName, idCounts, row.packetId);
    if (seen.has(thread.id)) errors.push(`Thread id collision ${thread.id}: ${inventoryKey(row)} and ${seen.get(thread.id)}`);
    else seen.set(thread.id, inventoryKey(row));
  }
  return errors;
}

function validateWrapperClassification(rows) {
  const errors = [];
  for (const row of rows) {
    if (!row.wrapped) continue;
    const expected = classify(row.row, row.rowArrayName).join('.');
    const actual = row.sectionPath.join('.');
    if (expected !== actual) errors.push(`${inventoryKey(row)} wrapper child is in ${actual}, expected ${expected}`);
  }
  return errors;
}

function wrapDocuments(documents, beforeRows, options) {
  const idCounts = countIds(beforeRows);
  const touchedRows = [];
  const skippedRows = [];

  for (const row of beforeRows) {
    const document = documents.get(row.filePath);
    const current = document.rows[row.rowArrayName][Number(row.rowPath.split('.').at(-1))];
    if (row.wrapped && !options.force) {
      skippedRows.push({ row, reason: 'already-wrapped' });
      continue;
    }
    const childRow = row.wrapped ? row.row : current;
    document.rows[row.rowArrayName][Number(row.rowPath.split('.').at(-1))] = makeThread(childRow, row.filePath, row.rowPath, row.rowArrayName, idCounts, row.packetId);
    touchedRows.push(row);
  }

  return { touchedRows, skippedRows };
}

function runUxValidator() {
  const result = spawnSync(process.execPath, [path.join(UX_ROOT, 'tools/validate-ux-system.cjs')], {
    cwd: REPO_ROOT,
    encoding: 'utf8'
  });
  return {
    ok: result.status === 0,
    output: `${result.stdout || ''}${result.stderr || ''}`.trim()
  };
}

function apply(options) {
  const files = collectPacketFiles();
  const documents = new Map(files.map((filePath) => [filePath, loadJson(filePath)]));
  const beforeRows = [];
  for (const [filePath, document] of documents.entries()) beforeRows.push(...collectRowsFromDocument(document, filePath));
  const idCounts = countIds(beforeRows);
  const alreadyWrappedCount = beforeRows.filter((row) => row.wrapped).length;
  const wrapperClassificationErrors = validateWrapperClassification(beforeRows);
  const initialThreadIdErrors = validateThreadIds(beforeRows, idCounts);
  const { touchedRows, skippedRows } = wrapDocuments(documents, beforeRows, options);
  const afterRows = [];
  for (const [filePath, document] of documents.entries()) afterRows.push(...collectRowsFromDocument(document, filePath));
  const inventoryErrors = compareInventories(beforeRows, afterRows);
  const finalThreadIdErrors = validateThreadIds(afterRows, countIds(afterRows));
  const nonWrappedAfter = afterRows.filter((row) => !row.wrapped);
  const errors = [
    ...wrapperClassificationErrors,
    ...initialThreadIdErrors,
    ...inventoryErrors,
    ...finalThreadIdErrors,
    ...nonWrappedAfter.map((row) => `${inventoryKey(row)} remained unwrapped after migration`)
  ];

  const rowArrayCounts = {};
  for (const row of beforeRows) rowArrayCounts[row.rowArrayName] = (rowArrayCounts[row.rowArrayName] || 0) + 1;

  const report = {
    mode: options.mode,
    scope: options.scope,
    root: path.relative(REPO_ROOT, FULL_APP_ROUTE_PACKET_ROOT),
    packetFilesScanned: files.length,
    rowsScanned: beforeRows.length,
    rowArrayCounts,
    alreadyWrappedCount,
    proposedWrapCount: touchedRows.length,
    skippedRowCount: skippedRows.length,
    semanticFingerprintPreserved: inventoryErrors.filter((item) => item.startsWith('Semantic row change')).length === 0,
    errors,
    touchedFiles: Array.from(new Set(touchedRows.map((row) => path.relative(REPO_ROOT, row.filePath)))).sort(),
    skippedRowsSample: skippedRows.slice(0, 25).map(({ row, reason }) => ({
      id: row.row.id,
      reason,
      file: path.relative(REPO_ROOT, row.filePath),
      rowPath: row.rowPath
    }))
  };

  return { ok: errors.length === 0, report, documents };
}

function writeDocuments(documents) {
  for (const [filePath, document] of documents.entries()) writeJson(filePath, document);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const preValidation = runUxValidator();
  if (!preValidation.ok) {
    console.log(preValidation.output);
    throw new Error('Refusing behavior-thread wrapper migration because UX validation failed before migration.');
  }

  const result = apply(options);
  console.log(JSON.stringify(result.report, null, 2));
  if (!result.ok) throw new Error('Refusing behavior-thread wrapper migration because preservation checks failed.');

  if (options.mode === 'write') {
    writeDocuments(result.documents);
    const postValidation = runUxValidator();
    if (!postValidation.ok) {
      console.log(postValidation.output);
      throw new Error('Behavior-thread wrapper migration wrote files, but post-write UX validation failed.');
    }
    console.log(postValidation.output);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
