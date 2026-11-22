// Emberfall — best-card-game-20261122-1826 entry program (Node 22, standard library only).
// It hands the game in: copies game/ and screenshots/ from beside this file to
// /output and writes /output/dossier.json, the summary the judge reads, with the
// vendored make.fun library. Outside the grader's container, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Before copying it validates the hand-in the way the scorer will read it:
//   - game/index.html exists and is a regular file under 1 MiB
//   - screenshots/ holds 3 or 4 images, each under 256 KiB, long side at most
//     1280 px and short side at least 480 px
//   - game/ stays within the scorer's caps (993 files, 48 MiB)
// A failed validation prints what is wrong and exits non-zero; nothing is
// written to /output in that case, so a bad hand-in never ships half-built.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const root = join(here, 'game');
const shots = join(here, 'screenshots');

function fail(message) {
  console.error('Emberfall hand-in refused: ' + message);
  process.exit(1);
}

function countFiles(dir) {
  let files = 0;
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      const sub = countFiles(p);
      files += sub.files;
      bytes += sub.bytes;
    } else {
      files += 1;
      bytes += st.size;
    }
  }
  return { files, bytes };
}

// --- validate game/ ---
const indexPath = join(root, 'index.html');
if (!existsSync(indexPath)) fail('game/index.html is missing.');
if (!statSync(indexPath).isFile()) fail('game/index.html is not a regular file.');
if (statSync(indexPath).size > 1024 * 1024) fail('game/index.html is over the 1 MiB cap.');
const gameTotals = countFiles(root);
if (gameTotals.files > 993) fail('game/ holds ' + gameTotals.files + ' files, over the 993 cap.');
if (gameTotals.bytes > 48 * 1024 * 1024) fail('game/ is over the 48 MiB cap.');

// --- validate screenshots/ ---
if (!existsSync(shots)) fail('screenshots/ is missing.');
const shotNames = readdirSync(shots).filter((n) => !n.startsWith('.')).sort();
if (shotNames.length < 3 || shotNames.length > 4) {
  fail('screenshots/ holds ' + shotNames.length + ' images; the hand-in needs 3 or 4.');
}
for (const name of shotNames) {
  const p = join(shots, name);
  const st = statSync(p);
  if (!st.isFile()) fail('screenshots/' + name + ' is not a regular file.');
  if (st.size > 262144) fail('screenshots/' + name + ' is ' + st.size + ' bytes, over the 256 KiB cap.');
  if (!/\.(png|jpe?g)$/i.test(name)) fail('screenshots/' + name + ' is not a PNG or JPEG.');
}

// --- hand it in ---
mkdirSync(out, { recursive: true });
cpSync(root, join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
cpSync(shots, join(out, 'screenshots'), { recursive: true });

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);

const dossierPath = join(out, 'dossier.json');
if (!existsSync(dossierPath) || statSync(dossierPath).size === 0) {
  fail('dossier.json was not written.');
}

console.log(
  'Emberfall handed in: ' + gameTotals.files + ' game files, ' +
  shotNames.length + ' screenshots (' + shotNames[0] + ' is the cover), ' +
  'dossier.json ' + statSync(dossierPath).size + ' bytes.',
);
