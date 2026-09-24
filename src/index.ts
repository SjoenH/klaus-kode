#!/usr/bin/env node
// oxlint-disable no-await-in-loop

import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";
import { Command } from "commander";
import { bootBanner } from "./bootBanner.js";
import { useTool } from "./tools/index.js";
import { dearKlaus } from "./helpers/dearKlaus.js";

const program = new Command();

console.log(bootBanner);
program
  .name("klaus-code")
  .description("The claude code killer")
  .version("1.0.0")

  // █ █ █   █▀█ █ █ █▀▀      █ █ █▀█ █▀▄ █▀▀
  // ▓▀▄ ▓░  █▀▓ █ ▓ ▀▀▓      ▓▀▄ █ ▓ █ ▓ ▓▀
  // ▀ ▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀      ▀ ▀ ▀▀▀ ▀▀  ▀▀▀

  // ƒør du begynner. Se Readme for hva du trenger
  // Kjør pn dev for å starte klaus.

  .action(async () => {
    const rl = readline.createInterface({ input, output });
    const chat = [];
    try {
      // Make it a loop
      while (true) {
        // GET the user PROOMPT
        const prompt = await rl.question("> ");
        chat.push(`Q: ${prompt.trim()}`);

        console.log("...");
        // FEED IT
        const response = await dearKlaus(chat.toString());

        const functionCalls = response.functionCalls;
        if (functionCalls) {
          // KLAUS WANTS AGENCY.
          // Who are we to reject his wish? TODO: Safety check
          for (const functionCall of functionCalls) {
            const toolResult = await useTool(functionCall);
            chat.push(`${functionCall.name} => ${toolResult}`);
            // PRESENT
            console.log(toolResult);
          }
        } else {
          const { text } = response;
          // Regular text answer.
          chat.push(`A: ${text}`);
          // SHOW IT back at the user
          console.log(text);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      rl.close();
    }
  });

program.parse(process.argv);
