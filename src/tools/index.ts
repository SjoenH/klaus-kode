import { FunctionCall } from "@google/genai";
import { rollDice } from "./rollDice.js";

export const tools: [
  {
    name: string;
    description: string;
    callBack: () => Promise<string>;
  },
] = [
  {
    name: "rollDice",
    description: "Roll the dice",
    callBack: rollDice,
  },
];

export async function useTool(functionCall: FunctionCall): Promise<string> {
  let functionCallResult = `Tool call ${functionCall.name} failed.`;
  const tool = tools.find((t) => t.name === functionCall.name);
  if (tool) functionCallResult = await tool.callBack();
  return functionCallResult;
}
