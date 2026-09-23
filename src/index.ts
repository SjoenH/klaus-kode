#!/usr/bin/env node

import { Command } from "commander";
import "./config"

const program = new Command();

program.name("klaus-code").description("The claude code killer").version("1.0.0");

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
  })

program.parse(process.argv);
