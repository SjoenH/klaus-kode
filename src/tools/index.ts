import { FunctionCall } from "@google/genai";
import { rollDice } from "./rollDice.js";
import { wait } from "./wait.js";
import { FunctionDeclaration } from "@google/genai";

export interface Tool extends FunctionDeclaration {
  callBack: (args?: FunctionCall["args"]) => Promise<string>;
}

export const tools: Tool[] = [
  {
    name: "rollDice",
    description: "Roll the dice",
    callBack: rollDice,
  },
  {
    name: "waitForMs",
    description: "Wait in ms",
    callBack: (args) => wait(+(args?.ms ?? 0)),
  },
];

export async function useTool(functionCall: FunctionCall): Promise<string> {
  let functionCallResult = `Tool call ${functionCall.name} failed.`;
  const tool = tools.find((t) => t.name === functionCall.name);
  if (tool) functionCallResult = await tool.callBack(functionCall.args);
  return functionCallResult;
}
