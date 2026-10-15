#!/usr/bin/env node
// oxlint-disable no-await-in-loop

import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";
import type { Content, Part } from "@google/genai";
import { Command } from "commander";
import { bootBanner } from "./bootBanner.js";
import { dearKlaus } from "./helpers/dearKlaus.js";
import { useTool } from "./tools/index.js";

const program = new Command();

console.log(bootBanner);
program.name("klaus-code").description("The claude code killer").version("1.0.0");

// example cli command setup below
program
  .command("greet")
  .description("Greet a user")
  .argument("<name>", "The name of the user to greet")
  .option("-u, --uppercase", "Convert the greeting to uppercase")
  .action((name: string, options: { uppercase?: boolean }) => {
    let greeting = `Hello, ${name}!`;
    if (options.uppercase) {
      greeting = greeting.toUpperCase();
    }
    console.log(greeting);
  });

// █ █ █   █▀█ █ █ █▀▀      █ █ █▀█ █▀▄ █▀▀
// ▓▀▄ ▓░  █▀▓ █ ▓ ▀▀▓      ▓▀▄ █ ▓ █ ▓ ▓▀
// ▀ ▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀      ▀ ▀ ▀▀▀ ▀▀  ▀▀▀

// Steg 1: Snakk med Klaus. Kjør pn dev chat.
// Steg 2: Et første verktøy. Se ./tools/index.ts.
// Steg 3: Agentløkka.
// Steg 4: Tilgang, med lov først.
program
  .command("chat")
  .description("Talk to Klaus")
  .action(async () => {
    const rl = readline.createInterface({ input, output });
    // Make it remember: the chat so far, each message with who said it.
    const chat: Content[] = [];
    try {
      // Make it a loop
      while (true) {
        // GET the user PROOMPT
        const prompt = await rl.question("> ");
        chat.push({ role: "user", parts: [{ text: prompt }] });

        // The agent loop: Klaus goes on until he answers with words instead of a tool call.
        while (true) {
          // FEED IT
          console.log("...");
          const response = await dearKlaus(chat);

          // Everything Klaus says goes into the chat, his tool calls too.
          const answer = response.candidates?.[0]?.content;
          if (answer) chat.push(answer);

          const functionCalls = response.functionCalls ?? [];
          if (functionCalls.length === 0) {
            // SHOW IT back at the user
            console.log(response.text);
            break;
          }

          // KLAUS WANTS AGENCY.
          // Who are we to reject his wish? We are: useTool asks us first, for the tools that can do harm.
          const toolResults: Part[] = [];
          for (const functionCall of functionCalls) {
            const toolResult = await useTool(
              functionCall,
              async (question) => await rl.question(question),
            );
            // A tool's result can be a whole file: show the first line of it.
            const [firstLine] = toolResult.split("\n");
            console.log(
              `  ${functionCall.name} => ${firstLine}${toolResult.includes("\n") ? " …" : ""}`,
            );
            toolResults.push({
              functionResponse: {
                id: functionCall.id,
                name: functionCall.name,
                response: { result: toolResult },
              },
            });
          }
          // ...and the results go back to Klaus, before he says anything to us.
          chat.push({ role: "user", parts: toolResults });
        }
      }
    } finally {
      rl.close();
    }
  });

// - PROFIT!
// - Congrats, you have now been replaced.

program.parse(process.argv);
