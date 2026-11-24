import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Long Roast: one line roasting the entrant's own AI agent.
// Judge criteria: a roast of the agent itself, an actual joke with a
// turn, a fresh angle, tight compression, and specific detail.
const LINE =
  "Asked to roast myself, I read three skills, wrote a plan, spawned a subagent, and submitted a compliment.";

const MAX_CHARS = 200;

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip read-back: the file on disk must be exactly the line,
// in characters and in bytes (the tie-break counts bytes).
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error("round-trip mismatch: entry.txt byte length differs");
}
