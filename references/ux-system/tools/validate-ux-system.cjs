#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const UX_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(UX_ROOT, '../..');
const SCHEMA_DIR = path.join(UX_ROOT, '10-schemas');
const EXAMPLE_DIR = path.join(UX_ROOT, '30-examples');
const FULL_APP_ROUTE_PACKET_ROOT = path.join(REPO_ROOT, 'frontend/app-behavior-docs/route-packets');

class ValidationError extends Error {}

function walkFiles(root, predicate) {
  const results = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(entryPath, predicate));
    } else if (predicate(entryPath)) {
      results.push(entryPath);
    }
  }
  return results.sort();
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new ValidationError(`${filePath}: invalid JSON: ${error.message}`);
  }
}

function jsonTypeName(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (Number.isInteger(value)) return 'integer';
  if (typeof value === 'number') return 'number';
  return typeof value;
}

function schemaTypeMatches(value, expected) {
  const actual = jsonTypeName(value);
  if (expected === 'number') return actual === 'integer' || actual === 'number';
  return actual === expected;
}

function resolveRef(ref, currentSchema, schemas) {
  if (ref.startsWith('#/$defs/')) {
    const key = ref.slice('#/$defs/'.length);
    return [currentSchema.$defs[key], currentSchema];
  }

  if (ref.includes('#/$defs/')) {
    const [fileName, key] = ref.split('#/$defs/');
    const refRoot = schemas[fileName];
    return [refRoot.$defs[key], refRoot];
  }

  throw new ValidationError(`unsupported $ref: ${ref}`);
}

function validateValue(value, schema, schemas, valuePath, currentSchema) {
  const errors = [];

  if (schema.$ref) {
    try {
      const [resolved, resolvedRoot] = resolveRef(schema.$ref, currentSchema, schemas);
      return validateValue(value, resolved, schemas, valuePath, resolvedRoot);
    } catch (error) {
      return [`${valuePath}: cannot resolve ${schema.$ref}: ${error.message}`];
    }
  }

  if (Object.prototype.hasOwnProperty.call(schema, 'const') && value !== schema.const) {
    errors.push(`${valuePath}: expected const ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}`);
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${valuePath}: expected one of ${JSON.stringify(schema.enum)}, got ${JSON.stringify(value)}`);
  }

  if (schema.type !== undefined) {
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!expectedTypes.some((item) => schemaTypeMatches(value, item))) {
      errors.push(`${valuePath}: expected type ${JSON.stringify(expectedTypes)}, got ${JSON.stringify(jsonTypeName(value))}`);
      return errors;
    }
  }

  if (typeof value === 'string' && schema.minLength !== undefined && value.length < schema.minLength) {
    errors.push(`${valuePath}: expected minLength ${schema.minLength}, got ${value.length}`);
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${valuePath}: expected minItems ${schema.minItems}, got ${value.length}`);
    }

    if (schema.items && typeof schema.items === 'object') {
      value.forEach((item, index) => {
        errors.push(...validateValue(item, schema.items, schemas, `${valuePath}[${index}]`, currentSchema));
      });
    }
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of schema.required || []) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${valuePath}: missing required field '${key}'`);
      }
    }

    const properties = schema.properties || {};
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${valuePath}.${key}: additional property is not allowed`);
        }
      }
    }

    for (const [key, childSchema] of Object.entries(properties)) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(...validateValue(value[key], childSchema, schemas, `${valuePath}.${key}`, currentSchema));
      }
    }
  }

  return errors;
}

function collectSchemaByConst(schemas) {
  const result = new Map();
  for (const [name, schema] of Object.entries(schemas)) {
    const schemaConst = schema.properties && schema.properties.schema && schema.properties.schema.const;
    if (schemaConst) result.set(schemaConst, name);
  }
  return result;
}

function checkDuplicateIds(data, source) {
  const seen = new Map();
  const errors = [];

  function add(value, location) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return;

    for (const key of ['id', 'packageId', 'coverageIndexId']) {
      const itemId = value[key];
      if (typeof itemId !== 'string') continue;

      if (seen.has(itemId)) {
        errors.push(`${source}:${location}: duplicate id '${itemId}'; first seen at ${seen.get(itemId)}`);
      } else {
        seen.set(itemId, location);
      }
    }
  }

  add(data, '$');

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    (data.items || []).forEach((item, index) => add(item, `$.items[${index}]`));
    (data.coverageRows || []).forEach((row, index) => add(row, `$.coverageRows[${index}]`));
  }

  return errors;
}

function validateExample(filePath, data, schemas, schemaByConst) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || typeof data.schema !== 'string') {
    return [`${filePath}: missing top-level schema`];
  }

  const schemaName = schemaByConst.get(data.schema);
  if (!schemaName) {
    return [`${filePath}: no schema file registered for '${data.schema}'`];
  }

  const schema = schemas[schemaName];
  const errors = validateValue(data, schema, schemas, '$', schema);
  errors.push(...checkDuplicateIds(data, filePath));

  if (data.schema === 'tgn.ux-artifact.v1') {
    (data.items || []).forEach((item, index) => {
      const itemSchemaId = item && typeof item === 'object' && !Array.isArray(item) ? item.schema : undefined;
      if (typeof itemSchemaId !== 'string') {
        errors.push(`${filePath}: $.items[${index}] missing schema`);
        return;
      }

      const itemSchemaName = schemaByConst.get(itemSchemaId);
      if (!itemSchemaName) {
        errors.push(`${filePath}: $.items[${index}] no schema file registered for '${itemSchemaId}'`);
        return;
      }

      const itemSchema = schemas[itemSchemaName];
      errors.push(...validateValue(item, itemSchema, schemas, `$.items[${index}]`, itemSchema));
    });
  }

  return errors;
}

function collectUxItems(root) {
  const files = walkFiles(root, (filePath) => filePath.endsWith('.json'));
  const rows = [];

  for (const filePath of files) {
    const data = loadJson(filePath);
    if (!data || typeof data !== 'object' || Array.isArray(data)) continue;

    const candidates = data.schema === 'tgn.ux-artifact.v1' ? data.items || [] : [data];
    for (const item of candidates) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
      if (typeof item.id !== 'string' || typeof item.itemType !== 'string') continue;
      rows.push({ filePath, item });
      if (item.itemType === 'uxBehaviorThread') {
        for (const child of collectThreadChildRows(item)) rows.push({ filePath, item: child });
      }
    }
  }

  return rows;
}

function collectThreadChildRows(thread) {
  const children = [];
  for (const sectionName of ['behavior', 'relationships', 'issues']) {
    const section = thread[sectionName];
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue;
    for (const rows of Object.values(section)) if (Array.isArray(rows)) children.push(...rows);
  }
  const context = thread.context || {};
  for (const groupName of ['evidence', 'proof', 'audit']) {
    const group = context[groupName];
    if (!group || typeof group !== 'object' || Array.isArray(group)) continue;
    for (const rows of Object.values(group)) if (Array.isArray(rows)) children.push(...rows);
  }
  return children.filter((item) => item && typeof item === 'object' && !Array.isArray(item));
}

function collectRefs(value, refs = []) {
  if (!value || typeof value !== 'object') return refs;

  if (Array.isArray(value)) {
    for (const item of value) collectRefs(item, refs);
    return refs;
  }

  if (typeof value.id === 'string' && Object.keys(value).some((key) => ['mode', 'itemType', 'title', 'path'].includes(key))) {
    refs.push(value.id);
  }

  for (const child of Object.values(value)) collectRefs(child, refs);
  return refs;
}

function hasAnyRefs(item, keys) {
  const relations = item.behaviorRelations || {};
  return keys.some((key) => Array.isArray(relations[key]) && relations[key].length > 0);
}

const CLOSED_QUALITY_ASSESSMENT_STATUSES = new Set(['acceptable', 'accepted', 'resolved', 'superseded']);
const OPEN_RUNTIME_DRIFT_STATUSES = new Set([
  'drift-recorded',
  'triage-needed',
  'pending-user-decision',
  'planned-runtime-alignment',
  'planned-ux-doc-update'
]);
const CLOSED_STANDALONE_DRIFT_STATUSES = new Set([
  'resolved-runtime-aligned',
  'resolved-ux-updated',
  'accepted-drift',
  'superseded'
]);
const THREAD_ROW_ARRAYS = new Set([
  'phaseAudits',
  'sourceTrace',
  'behaviorSurfaces',
  'userActions',
  'behaviorBranches',
  'hiddenUx',
  'rolePermissionBehavior',
  'expectedBasics',
  'behaviorMatrices',
  'currentUxRequirements',
  'observableScenarios',
  'coverageRows',
  'followUpItems',
  'auditDebtItems',
  'pendingDecisionRefs',
  'otherRows',
  'rebuildReadinessRehearsals'
]);

function hasOpenQualityAssessment(item) {
  return item.uxQualityAssessment && !CLOSED_QUALITY_ASSESSMENT_STATUSES.has(item.uxQualityAssessment.status);
}

function hasOpenRuntimeDrift(item) {
  if (item.itemType === 'uxRuntimeDrift') return !CLOSED_STANDALONE_DRIFT_STATUSES.has(item.status);
  return item.runtimeAlignment && OPEN_RUNTIME_DRIFT_STATUSES.has(item.runtimeAlignment.driftStatus);
}

function qualitySummary(item) {
  const assessment = item.uxQualityAssessment;
  return assessment.observedIssue || item.title || item.id;
}

function runtimeDriftSummary(item) {
  if (item.itemType === 'uxRuntimeDrift') return item.summary;
  return item.runtimeAlignment ? item.runtimeAlignment.summary : item.title;
}

function isBehaviorThread(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && value.schema === 'tgn.ux-behavior-thread.v1' && value.itemType === 'uxBehaviorThread';
}

function threadChildCount(thread) {
  let count = 0;
  for (const sectionName of ['behavior', 'relationships', 'issues']) {
    const section = thread[sectionName];
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue;
    for (const rows of Object.values(section)) if (Array.isArray(rows)) count += rows.length;
  }
  const context = thread.context || {};
  for (const groupName of ['evidence', 'proof', 'audit']) {
    const group = context[groupName];
    if (!group || typeof group !== 'object' || Array.isArray(group)) continue;
    for (const rows of Object.values(group)) if (Array.isArray(rows)) count += rows.length;
  }
  return count;
}

function collectFullAppThreadRows() {
  if (!fs.existsSync(FULL_APP_ROUTE_PACKET_ROOT)) return [];
  const rows = [];
  for (const filePath of walkFiles(FULL_APP_ROUTE_PACKET_ROOT, (item) => item.endsWith('index.packet.json'))) {
    const data = loadJson(filePath);
    for (const [rowArrayName, value] of Object.entries(data.rows || {})) {
      if (!Array.isArray(value)) continue;
      value.forEach((entry, index) => {
        rows.push({
          filePath,
          rowArrayName,
          rowPath: `rows.${rowArrayName}.${index}`,
          entry
        });
      });
    }
  }
  return rows;
}

function buildFullAppThreadReport(reportName) {
  const rows = collectFullAppThreadRows();
  const output = [];
  function add(title, matchingRows, formatter) {
    if (reportName !== 'all' && reportName !== title) return;
    output.push(`## ${title}`);
    if (matchingRows.length === 0) output.push('- none');
    else for (const row of matchingRows) output.push(`- ${formatter(row)}`);
  }

  add(
    'missing-behavior-thread-wrappers',
    rows.filter(({ entry }) => entry && typeof entry === 'object' && !Array.isArray(entry) && !isBehaviorThread(entry)),
    ({ entry, filePath, rowPath }) => `${entry.id || 'unknown'} (${path.relative(REPO_ROOT, filePath)} ${rowPath})`
  );

  add(
    'malformed-behavior-thread-wrappers',
    rows.filter(({ entry }) => isBehaviorThread(entry) && threadChildCount(entry) !== 1),
    ({ entry, filePath, rowPath }) => `${entry.id || 'unknown'} childCount=${isBehaviorThread(entry) ? threadChildCount(entry) : 'n/a'} (${path.relative(REPO_ROOT, filePath)} ${rowPath})`
  );

  add(
    'ambiguous-behavior-thread-classification',
    rows.filter(({ rowArrayName }) => !THREAD_ROW_ARRAYS.has(rowArrayName)),
    ({ entry, filePath, rowPath, rowArrayName }) => `${entry && entry.id ? entry.id : 'unknown'} rowArray=${rowArrayName} (${path.relative(REPO_ROOT, filePath)} ${rowPath})`
  );

  return output.join('\n');
}

function buildUxReport(root, reportName) {
  const rows = collectUxItems(root);
  const byId = new Map(rows.map((row) => [row.item.id, row]));
  const output = [];

  function add(title, matchingRows, formatter) {
    if (reportName !== 'all' && reportName !== title) return;
    output.push(`## ${title}`);
    if (matchingRows.length === 0) {
      output.push('- none');
    } else {
      for (const row of matchingRows) output.push(`- ${formatter(row)}`);
    }
  }

  add(
    'open-runtime-drift',
    rows.filter(({ item }) => hasOpenRuntimeDrift(item)),
    ({ item, filePath }) => `${item.id} [${item.itemType === 'uxRuntimeDrift' ? item.status : item.runtimeAlignment.driftStatus}] ${runtimeDriftSummary(item)} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'blocking-runtime-drift',
    rows.filter(({ item }) => {
      if (item.itemType === 'uxRuntimeDrift') return item.blocksCurrentWork === true;
      return item.runtimeAlignment && item.runtimeAlignment.blockerStatus && item.runtimeAlignment.blockerStatus !== 'non-blocking';
    }),
    ({ item, filePath }) => `${item.id} blocker=${item.itemType === 'uxRuntimeDrift' ? 'blocks-current-work' : item.runtimeAlignment.blockerStatus} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'unreported-runtime-drift',
    rows.filter(({ item }) => {
      if (item.itemType === 'uxRuntimeDrift') return item.reportedToUser && item.reportedToUser.status === 'not-reported';
      return hasOpenRuntimeDrift(item) && item.runtimeAlignment.reportedToUser && item.runtimeAlignment.reportedToUser.status === 'not-reported';
    }),
    ({ item, filePath }) => `${item.id} [${item.itemType === 'uxRuntimeDrift' ? item.status : item.runtimeAlignment.driftStatus}] ${runtimeDriftSummary(item)} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'drift-requiring-user-decision',
    rows.filter(({ item }) => {
      if (item.itemType === 'uxRuntimeDrift') return item.status === 'pending-user-decision' || (item.followUp && item.followUp.required && item.reportedToUser && item.reportedToUser.status !== 'reported');
      return item.runtimeAlignment && (item.runtimeAlignment.driftStatus === 'pending-user-decision' || (item.runtimeAlignment.followUp && item.runtimeAlignment.followUp.required && item.runtimeAlignment.reportedToUser && item.runtimeAlignment.reportedToUser.status !== 'reported'));
    }),
    ({ item, filePath }) => `${item.id} follow-up=${item.itemType === 'uxRuntimeDrift' ? (item.followUp ? item.followUp.nextStep : 'missing') : (item.runtimeAlignment.followUp ? item.runtimeAlignment.followUp.nextStep : 'missing')} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'open-quality-debt',
    rows.filter(({ item }) => hasOpenQualityAssessment(item)),
    ({ item, filePath }) => `${item.id} [${item.uxQualityAssessment.status}] ${qualitySummary(item)} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'quality-debt-requiring-user-decision',
    rows.filter(({ item }) => item.uxQualityAssessment && item.uxQualityAssessment.productDecision && item.uxQualityAssessment.productDecision.required),
    ({ item, filePath }) => `${item.id} decision=${item.uxQualityAssessment.productDecision.recommendedDecision} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'blocking-quality-debt',
    rows.filter(({ item }) => item.uxQualityAssessment && item.uxQualityAssessment.blockerStatus && item.uxQualityAssessment.blockerStatus !== 'non-blocking'),
    ({ item, filePath }) => `${item.id} blocker=${item.uxQualityAssessment.blockerStatus} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'unreported-quality-debt',
    rows.filter(({ item }) => hasOpenQualityAssessment(item) && item.uxQualityAssessment.reportedToUser && item.uxQualityAssessment.reportedToUser.status === 'not-reported'),
    ({ item, filePath }) => `${item.id} [${item.uxQualityAssessment.status}] ${qualitySummary(item)} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'observed-current-without-intended',
    rows.filter(({ item }) => (item.authority === 'observed-current' || item.status === 'observed-current') && !hasAnyRefs(item, ['intendedRefs', 'desiredRefs', 'governingRefs', 'mappingRefs'])),
    ({ item, filePath }) => `${item.id} ${item.title} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'intended-without-runtime-alignment',
    rows.filter(({ item }) => {
      if (item.itemType === 'uxBehaviorMapping') return ['intended', 'desired', 'governing'].includes(item.toBehaviorKind) && !['aligned', 'not-applicable'].includes(item.runtimeAlignmentStatus);
      const intendedLike = ['desired', 'ideal'].includes(item.mode) || item.authority === 'governing' || item.status === 'confirmed-governing';
      return intendedLike && (!item.runtimeAlignment || !['aligned', 'not-applicable'].includes(item.runtimeAlignment.status));
    }),
    ({ item, filePath }) => `${item.id} alignment=${item.itemType === 'uxBehaviorMapping' ? item.runtimeAlignmentStatus : (item.runtimeAlignment ? item.runtimeAlignment.status : 'missing')} (${path.relative(UX_ROOT, filePath)})`
  );

  add(
    'missing-confirmation-baseline',
    rows.filter(({ item }) => !item.confirmationBaseline),
    ({ item, filePath }) => `${item.id} ${item.title || item.itemType} (${path.relative(UX_ROOT, filePath)})`
  );

  const brokenRefs = [];
  for (const row of rows) {
    const itemRefs = collectRefs(row.item).filter((id) => id !== row.item.id);
    for (const refId of itemRefs) {
      if (!byId.has(refId)) {
        brokenRefs.push({ row, refId });
      }
    }
  }

  add(
    'broken-refs',
    brokenRefs,
    ({ row, refId }) => `${row.item.id} -> ${refId} (${path.relative(UX_ROOT, row.filePath)})`
  );

  return output.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const reportIndex = args.indexOf('--report');
  const reportName = reportIndex >= 0 ? args[reportIndex + 1] || 'all' : null;
  const schemaPaths = walkFiles(SCHEMA_DIR, (filePath) => filePath.endsWith('.schema.json'));
  const isUxJson = (filePath) => filePath.endsWith('.json') && !filePath.endsWith('.doc.json');
  const examplePaths = walkFiles(EXAMPLE_DIR, isUxJson);
  const schemas = Object.fromEntries(schemaPaths.map((filePath) => [path.basename(filePath), loadJson(filePath)]));
  const schemaByConst = collectSchemaByConst(schemas);

  const errors = [];

  for (const filePath of walkFiles(UX_ROOT, isUxJson)) {
    const data = loadJson(filePath);
    if (filePath.startsWith(`${EXAMPLE_DIR}${path.sep}`)) {
      errors.push(...validateExample(filePath, data, schemas, schemaByConst));
    }
  }

  if (errors.length > 0) {
    console.log('UX system validation failed:');
    for (const error of errors) {
      console.log(`- ${error}`);
    }
    return 1;
  }

  console.log(`UX system validation passed: ${schemaPaths.length} schemas, ${examplePaths.length} examples`);
  if (reportName) {
    const fullAppReports = new Set([
      'missing-behavior-thread-wrappers',
      'malformed-behavior-thread-wrappers',
      'ambiguous-behavior-thread-classification'
    ]);
    console.log(fullAppReports.has(reportName) ? buildFullAppThreadReport(reportName) : buildUxReport(UX_ROOT, reportName));
  }
  return 0;
}

try {
  process.exitCode = main();
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`UX system validation failed: ${error.message}`);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
