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
    parameters: {
      format: "int32",
      description: "time to wait in ms",
    },
    callBack: (args) => wait(+(args?.ms ?? 0)), // Merk at det kommer som streng og gjøres om til tall https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
  },
];

export async function useTool(functionCall: FunctionCall): Promise<string> {
  let functionCallResult = `Tool call ${functionCall.name} failed.`;
  const tool = tools.find((t) => t.name === functionCall.name);
  if (tool) functionCallResult = await tool.callBack(functionCall.args);
  return functionCallResult;
}
