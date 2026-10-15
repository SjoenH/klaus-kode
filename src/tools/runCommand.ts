import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function runCommand(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(command, { timeout: 30_000 });
    return `${stdout}${stderr}` || "(the command printed nothing)";
  } catch (error) {
    // A command that fails has often printed something worth reading too.
    const printed =
      error instanceof Error && "stdout" in error && "stderr" in error
        ? `${String(error.stdout)}${String(error.stderr)}`
        : "";
    return `The command failed: ${error instanceof Error ? error.message : String(error)}\n${printed}`;
  }
}
