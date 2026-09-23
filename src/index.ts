#!/usr/bin/env node

import { Command } from "commander";
import { bootBanner } from "./bootBanner.js";
import { ai } from "./config.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const program = new Command();

console.log(bootBanner);
program
  .name("klaus-code")
  .description("The claude code killer")
  .version("1.0.0");

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

// ƒør du begynner. Se Readme for hva du trenger
// Kjør pn dev for å starte klaus.

// - TODO: set up a new command to ask/interact with klaus
//   -  Hint, need a new program.command()...
program
  .command("chat")
  .description("chat with Klaus")
  .action(async () => {
    const rl = readline.createInterface({ input, output });
    const chat = [];
    try {
      // Make it a loop
      while (true) {
        // GET the user PROOMPT
        const prompt = await rl.question("> ");
        chat.push(prompt);
        // FEED IT TO your choosen one
        const response = await ask(chat.toString());
        const answer = response.text;
        chat.push(answer);
        // SHOW IT back at the user
        console.log(answer);
      }
    } finally {
      rl.close();
    }
  });
// - TODO: ....
// - TODO: GIVE IT ACCESS to all your stuff (and other tools)
// - TODO: PROFIT!
// - Congrats, you have now been replaced.

// - Optional, wire up System prompt, give it a personality etc.

program.parse(process.argv);

// Klaus' little Helpers

async function ask(prompt: string) {
  return await ai.models.generateContent({
    model: "gemini-3.8-flash", // Use your target Gemini flash model
    contents: prompt,
  });
}
