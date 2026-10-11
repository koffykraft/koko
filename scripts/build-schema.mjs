// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
// Turns migrations/*.sql into schema.js, which the Worker runs once on a new, empty database,
// because the deploy token cannot run migrations. Usage: node scripts/build-schema.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'migrations');
const stmts = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort()) {
  const sql = fs.readFileSync(path.join(dir, f), 'utf8').replace(/--[^\n]*/g, '');
  for (const s of sql.split(';').map(x => x.trim()).filter(Boolean)) if (!/^PRAGMA/i.test(s)) stmts.push(s);
}
fs.writeFileSync(
  path.join(root, 'schema.js'),
  '// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.\n// Generated from migrations/ by scripts/build-schema.mjs. Do not edit by hand.\nexport const SCHEMA = ' +
    JSON.stringify(stmts, null, 1) +
    ';\n'
);
console.log(stmts.length + ' statements');
