import { readdir, readFile as read } from "node:fs/promises";

export async function listFiles(path: string): Promise<string> {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.map((entry) => (entry.isDirectory() ? `${entry.name}/` : entry.name)).join("\n");
}

export async function readFile(path: string): Promise<string> {
  return await read(path, "utf8");
}
