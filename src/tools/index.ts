import type { FunctionCall, FunctionDeclaration } from "@google/genai";
import { z } from "zod";
import { listFiles, readFile, writeFile } from "./files.js";
import { rollDice } from "./rollDice.js";
import { runCommand } from "./runCommand.js";
import { wait } from "./wait.js";

export interface Tool {
  name: string;
  description: string;
  // What Klaus has to send along, as a schema: it is told the schema, and what he sends is checked against it.
  input: z.ZodObject;
  // Safety check: ask the user before the tool runs.
  askFirst?: boolean;
  run: (args: unknown) => Promise<string>;
}

// Keeps each tool's own types: run gets what its schema says, after the schema has checked it.
function defineTool<S extends z.ZodObject>(tool: {
  name: string;
  description: string;
  input: S;
  askFirst?: boolean;
  run: (args: z.infer<S>) => Promise<string>;
}): Tool {
  return { ...tool, run: async (args) => await tool.run(tool.input.parse(args)) };
}

export const tools: Tool[] = [
  defineTool({
    name: "rollDice",
    description: "Roll a six-sided dice",
    input: z.object({}),
    run: rollDice,
  }),
  defineTool({
    name: "wait",
    description: "Wait for a while",
    input: z.object({ ms: z.number().int().describe("How long to wait, in milliseconds") }),
    run: async ({ ms }) => await wait(ms),
  }),
  defineTool({
    name: "listFiles",
    description: "List the files and folders in a folder of the project",
    input: z.object({ path: z.string().describe("The folder, relative to the project") }),
    run: async ({ path }) => await listFiles(path),
  }),
  defineTool({
    name: "readFile",
    description: "Read a text file in the project",
    input: z.object({ path: z.string().describe("The file, relative to the project") }),
    run: async ({ path }) => await readFile(path),
  }),
  defineTool({
    name: "writeFile",
    description: "Write a text file in the project, replacing what was there",
    input: z.object({
      path: z.string().describe("The file, relative to the project"),
      content: z.string().describe("Everything the file is to hold"),
    }),
    askFirst: true,
    run: async ({ path, content }) => await writeFile(path, content),
  }),
  defineTool({
    name: "runCommand",
    description: "Run a shell command in the project folder, and get what it printed",
    input: z.object({ command: z.string().describe("The command, as typed in a terminal") }),
    askFirst: true,
    run: async ({ command }) => await runCommand(command),
  }),
];

// What Klaus is told about his tools: their names, what they are for, and what to send along.
export const declarations: FunctionDeclaration[] = tools.map(({ name, description, input }) => ({
  name,
  description,
  parametersJsonSchema: z.toJSONSchema(input),
}));

export async function useTool(
  functionCall: FunctionCall,
  ask: (question: string) => Promise<string>,
): Promise<string> {
  const tool = tools.find((t) => t.name === functionCall.name);
  if (!tool) return `There is no tool called ${functionCall.name}.`;

  const args = functionCall.args ?? {};
  if (tool.askFirst) {
    const answer = await ask(
      `Klaus vil bruke ${tool.name} med ${JSON.stringify(args)}. Greit? (j/n) `,
    );
    if (answer.trim().toLowerCase() !== "j") return "The user said no.";
  }

  // A tool that fails tells Klaus why, so he can try again.
  try {
    return await tool.run(args);
  } catch (error) {
    return `${tool.name} failed: ${error instanceof Error ? error.message : String(error)}`;
  }
}
