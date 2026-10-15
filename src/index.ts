#!/usr/bin/env node
// oxlint-disable no-await-in-loop

import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";
import type { Content } from "@google/genai";
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

        // FEED IT
        console.log("...");
        const response = await dearKlaus(chat);

        // KLAUS WANTS AGENCY.
        // Who are we to reject his wish?
        const functionCalls = response.functionCalls ?? [];
        for (const functionCall of functionCalls) {
          const toolResult = await useTool(functionCall);
          console.log(toolResult);
        }

        if (functionCalls.length === 0) {
          chat.push({ role: "model", parts: [{ text: response.text ?? "" }] });
          // SHOW IT back at the user
          console.log(response.text);
        }
      }
    } finally {
      rl.close();
    }
  });

// Steg 3: Agentløkka
// - TODO: ....send the tool result back, until klaus is done
//
// Steg 4: Tilgang
// - TODO: GIVE IT ACCESS to all your stuff (and other tools)
// - TODO: Safety check
// - TODO: PROFIT!
// - Congrats, you have now been replaced.

program.parse(process.argv);
