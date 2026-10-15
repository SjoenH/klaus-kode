import { mkdir, readdir, readFile as read, writeFile as write } from "node:fs/promises";
import { dirname } from "node:path";

export async function listFiles(path: string): Promise<string> {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.map((entry) => (entry.isDirectory() ? `${entry.name}/` : entry.name)).join("\n");
}

export async function readFile(path: string): Promise<string> {
  return await read(path, "utf8");
}

export async function writeFile(path: string, content: string): Promise<string> {
  await mkdir(dirname(path), { recursive: true });
  await write(path, content, "utf8");
  return `Wrote ${content.length} characters to ${path}.`;
}
