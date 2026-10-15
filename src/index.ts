#!/usr/bin/env node

import { Command } from "commander";
import { bootBanner } from "./bootBanner.js";
import { ai } from "./config.js";

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

// ƒør du begynner. Se Readme for hva du trenger
// Kjør pn dev for å starte klaus.

// Steg 1: Snakk med Klaus
// - TODO: set up a new command to ask/interact with klaus
//   -  Hint, need a new program.command()...
// - TODO: GET the user PROOMPT
// - TODO: FEED IT TO your choosen one
// - TODO: SHOW IT back at the user
// - TODO: Make it a loop
// - TODO: Make it remember: send the whole chat, with roles
// - TODO: Give it a personality (system prompt)
//
// Steg 2: Et første verktøy
// - TODO: GIVE IT ACCESS to a tool: roll the dice
//
// Steg 3: Agentløkka
// - TODO: ....send the tool result back, until klaus is done
//
// Steg 4: Tilgang
// - TODO: GIVE IT ACCESS to all your stuff (and other tools)
// - TODO: Safety check
// - TODO: PROFIT!
// - Congrats, you have now been replaced.

program.parse(process.argv);

// Klaus' little Helpers

// oxlint-disable-next-line no-unused-vars -- du tar den i bruk i steg 1
async function ask(prompt: string) {
  return await ai.models.generateContent({
    model: "gemini-3.8-flash", // Use your target Gemini flash model
    contents: prompt,
  });
}
