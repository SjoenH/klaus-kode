#!/usr/bin/env node

import { Command } from "commander";
import "./config";
import { bootBanner } from "./bootBanner.js";

const program = new Command();

console.log(bootBanner);
program.name("klaus-code").description("The claude code killer").version("1.0.0");

program
  // example cli command setup below
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
// - TODO: GET the user PROOMPT
// - TODO: FEED IT TO your choosen one
// - TODO: SHOW IT back at the user
// - TODO: ....
// - TODO: Make it a loop
// - TODO: GIVE IT ACCESS to all your stuff (and other tools)
// - TODO: PROFIT!
// - Congrats, you have now been replaced.

// - Optional, wire up System prompt.

program.parse(process.argv);
