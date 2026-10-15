import type { FunctionCall, FunctionDeclaration } from "@google/genai";
import { rollDice } from "./rollDice.js";

export interface Tool {
  name: string;
  description: string;
  run: () => Promise<string>;
}

export const tools: Tool[] = [
  {
    name: "rollDice",
    description: "Roll a six-sided dice",
    run: rollDice,
  },
];

// What Klaus is told about his tools: their names and what they are for. He never sees the code.
export const declarations: FunctionDeclaration[] = tools.map(({ name, description }) => ({
  name,
  description,
}));

export async function useTool(functionCall: FunctionCall): Promise<string> {
  const tool = tools.find((t) => t.name === functionCall.name);
  if (!tool) return `There is no tool called ${functionCall.name}.`;
  return await tool.run();
}
