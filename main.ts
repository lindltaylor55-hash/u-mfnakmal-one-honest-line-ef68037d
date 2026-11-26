// One Honest Line — entry program.
// Reads entry.txt and writes it verbatim to /output/entry.txt.
// Node 22, standard library only.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");

// Gate (per RULES.txt): /output/entry.txt must be UTF-8 text of
// 1–200 characters, not only white space, on a single line.
const entry = raw.replace(/\r\n/g, "\n");
const lines = entry.split("\n").filter((l) => l.length > 0);
if (lines.length !== 1) {
  throw new Error(`entry.txt must hold exactly one line, found ${lines.length}`);
}
const line = lines[0];
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry is ${line.length} characters, gate requires 1–200`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");
console.log(`Wrote ${line.length} characters to /output/entry.txt`);
