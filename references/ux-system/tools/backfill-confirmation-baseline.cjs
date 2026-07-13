#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const DEFAULT_COMMIT = 'a1a3a1580f6001b2c3be6b4c08c0abffba2467dd';
const DEFAULT_ROOTS = [
  'agent/ux-system',
  'frontend/agent-plans/full-app-ux-audit'
];

function parseArgs(argv) {
  const options = {
    mode: 'check',
    commit: DEFAULT_COMMIT,
    force: false,
    roots: [...DEFAULT_ROOTS]
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--check') {
      options.mode = 'check';
    } else if (arg === '--write') {
      options.mode = 'write';
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--commit') {
      options.commit = argv[index + 1];
      index += 1;
    } else if (arg === '--root') {
      options.roots = [argv[index + 1]];
      index += 1;
    } else if (arg === '--help') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!/^[0-9a-f]{40}$/.test(options.commit || '')) {
    throw new Error(`--commit must be a full 40-character lowercase git hash; received ${options.commit}`);
  }

  return options;
}

function help() {
  return [
    'Usage: node agent/ux-system/tools/backfill-confirmation-baseline.cjs [--check|--write] [--commit <hash>] [--force] [--root <path>]',
    '',
    'Backfills confirmationBaseline on recognized UX spec rows.',
    'Default mode is --check. Use --write to mutate files.',
    'Default roots:',
    ...DEFAULT_ROOTS.map((root) => `- ${root}`)
  ].join('\n');
}

function commitDate(commit) {
  return execFileSync('git', ['show', '-s', '--format=%cI', commit], {
    cwd: REPO_ROOT,
    encoding: 'utf8'
  }).trim().slice(0, 10);
}

function walkJsonFiles(root, results = []) {
  if (!fs.existsSync(root)) return results;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      walkJsonFiles(entryPath, results);
    } else if (
      entry.name.endsWith('.json') &&
      !entry.name.endsWith('.doc.json') &&
      !entry.name.endsWith('.schema.json')
    ) {
      results.push(entryPath);
    }
  }

  return results;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFormalUxItem(value) {
  return (
    isPlainObject(value) &&
    typeof value.id === 'string' &&
    typeof value.itemType === 'string' &&
    typeof value.schema === 'string' &&
    value.schema.startsWith('tgn.ux-')
  );
}

function isAuditRow(value) {
  return isPlainObject(value) && typeof value.id === 'string' && typeof value.schemaRole === 'string';
}

function isFormalCoverageRow(value, keyPath) {
  return (
    isPlainObject(value) &&
    keyPath[keyPath.length - 1] === 'coverageRows' &&
    typeof value.id === 'string' &&
    isPlainObject(value.itemRef)
  );
}

function qualifiesAsUxRow(value, keyPath) {
  return isFormalUxItem(value) || isAuditRow(value) || isFormalCoverageRow(value, keyPath);
}

function rowLabel(value) {
  return value.id || value.title || '<unknown-row>';
}

function visitRows(value, keyPath, rows) {
  if (Array.isArray(value)) {
    for (const item of value) visitRows(item, keyPath, rows);
    return;
  }

  if (!isPlainObject(value)) return;

  if (qualifiesAsUxRow(value, keyPath)) {
    rows.push(value);
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    visitRows(child, [...keyPath, key], rows);
  }
}

function buildBaseline(commit, date) {
  return {
    lastConfirmedCommit: commit,
    lastConfirmedAt: date,
    method: 'bulk-backfill',
    scope: 'one-pass-ux-spec-creation',
    notesMd: 'Backfilled as the audit baseline for the one-pass UX spec creation/update. This records provenance only; it does not replace UX authority, product confirmation, row-inline behaviorRelations fields, or row-inline runtimeAlignment fields and generated drift reports.'
  };
}

function processFile(filePath, baseline, options) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return { filePath, parseError: error.message, rows: 0, updates: 0, conflicts: [] };
  }

  const rows = [];
  visitRows(data, [], rows);
  let updates = 0;
  const conflicts = [];

  for (const row of rows) {
    if (!row.confirmationBaseline || options.force) {
      row.confirmationBaseline = { ...baseline };
      updates += 1;
      continue;
    }

    if (row.confirmationBaseline.lastConfirmedCommit !== baseline.lastConfirmedCommit) {
      conflicts.push({
        id: rowLabel(row),
        existingCommit: row.confirmationBaseline.lastConfirmedCommit
      });
    }
  }

  if (options.mode === 'write' && updates > 0) {
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  }

  return { filePath, rows: rows.length, updates, conflicts };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(help());
    return 0;
  }

  const date = commitDate(options.commit);
  const baseline = buildBaseline(options.commit, date);
  const files = options.roots.flatMap((root) => walkJsonFiles(path.resolve(REPO_ROOT, root))).sort();
  const results = files.map((filePath) => processFile(filePath, baseline, options));
  const touched = results.filter((result) => result.updates > 0);
  const rowFiles = results.filter((result) => result.rows > 0);
  const conflicts = results.flatMap((result) => result.conflicts.map((conflict) => ({ ...conflict, filePath: result.filePath })));
  const parseErrors = results.filter((result) => result.parseError);
  const totalRows = results.reduce((sum, result) => sum + result.rows, 0);
  const totalUpdates = results.reduce((sum, result) => sum + result.updates, 0);

  console.log(`Mode: ${options.mode}`);
  console.log(`Baseline commit: ${options.commit}`);
  console.log(`Baseline date: ${date}`);
  console.log(`Files scanned: ${files.length}`);
  console.log(`Files with UX rows: ${rowFiles.length}`);
  console.log(`Files ${options.mode === 'write' ? 'updated' : 'that would update'}: ${touched.length}`);
  console.log(`UX rows found: ${totalRows}`);
  console.log(`UX rows ${options.mode === 'write' ? 'updated' : 'that would update'}: ${totalUpdates}`);
  console.log(`Conflicts: ${conflicts.length}`);
  console.log(`Parse errors: ${parseErrors.length}`);

  if (touched.length > 0) {
    console.log('');
    console.log(options.mode === 'write' ? 'Updated files:' : 'Files that would update:');
    for (const result of touched) {
      console.log(`- ${path.relative(REPO_ROOT, result.filePath)} (${result.updates}/${result.rows} rows)`);
    }
  }

  if (conflicts.length > 0) {
    console.log('');
    console.log('Existing baseline conflicts:');
    for (const conflict of conflicts) {
      console.log(`- ${path.relative(REPO_ROOT, conflict.filePath)} :: ${conflict.id} has ${conflict.existingCommit}`);
    }
  }

  if (parseErrors.length > 0) {
    console.log('');
    console.log('Parse errors:');
    for (const error of parseErrors) {
      console.log(`- ${path.relative(REPO_ROOT, error.filePath)}: ${error.parseError}`);
    }
  }

  if (parseErrors.length > 0 || conflicts.length > 0) return 1;
  return 0;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
