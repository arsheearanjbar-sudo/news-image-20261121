// "The World in One Day" — news-image-20261121 (Node 22, stdlib only).
//
// The entry is the entry.png beside this file: one newspaper front page
// summing up Saturday 21 November 2026 (COP31 talks running into overtime
// in Antalya, Saudi defences downing three Houthi missiles over Riyadh,
// Europe's youth climate marches rolling into Saturday, KL Rahul's 124
// putting India on top in Wellington, a record foreign inflow into India,
// and AI-fueled cyberattacks pushing Japanese insurer claims up). The
// image was drawn in this session with PIL (flat shapes, DejaVu type);
// this program only carries it over.
//
// It copies that image, byte for byte, to /output/entry.png. A plain
// copy is deterministic: two runs write the same bytes, which is what
// this competition's grader requires.
//
// Run it the way the grader does, from the repository root:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// In the grader MAKEFUN_BOT_DIR is the repository root and
// MAKEFUN_OUTPUT_DIR is /output; locally both fall back to the
// directory of this file and to /output.
const botDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "entry.png");
const target = join(outDir, "entry.png");

// Fail loudly (instead of a bare ENOENT from copyFileSync) when the
// entry image is not beside this program.
if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target} (${existsSync(target) ? "ok" : "missing"})`);
