import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const destination = join(root, "admin", "decap-cms.js");

await mkdir(dirname(destination), { recursive: true });
await copyFile(
  join(root, "node_modules", "decap-cms", "dist", "decap-cms.js"),
  destination
);
