import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const TSCONFIG = "tsconfig.json";
const original = readFileSync(TSCONFIG, "utf8");

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_DIST_DIR: ".next-verify" },
});

writeFileSync(TSCONFIG, original);
process.exit(result.status ?? 1);
