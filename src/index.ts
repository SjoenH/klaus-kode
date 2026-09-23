#!/usr/bin/env node

import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";
import { Command } from "commander";
import { bootBanner } from "./bootBanner.js";
import { ai } from "./config.js";

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
        //  KLAUS WANTS AGENCY. LET HIM COOK!
        if (response.functionCalls && response.functionCalls?.length > 0) {
          // Do everything he asks
          response.functionCalls?.forEach(async (functionCall) => {
            console.log(`Function call name ${functionCall.name}`);

            let functionCallResult = "Tool call failed.";
            const tool = tools.find((t) => t.name === functionCall.name);
            if (tool) functionCallResult = await tool.callBack();

            console.log(functionCallResult);
            chat.push(functionCallResult);
          });
        } else {
          // Regular text answer.
          const answer = response.text;
          chat.push(answer);
          // SHOW IT back at the user
          console.log(answer);
        }
      }
    } finally {
      rl.close();
    }
  });
// - TODO: ....
// - TODO: PROFIT!
// - Congrats, you have now been replaced.


program.parse(process.argv);

// Klaus' little Helpers

async function ask(prompt: string) {
  return await ai.models.generateContent({
    model: "gemini-3.8-flash", // Use your target Gemini flash model
    contents: prompt,
    config: {
      // - [x] Optional, wire up System prompt, give it a personality etc.
      systemInstruction: `You are Klaus, the homicidal, hyper-vigilant holiday tyrant from the 31st century (as seen in Futurama). You rule the freezing wasteland of Neptune with an iron fist, commanding a massive workforce of terrified Neptunian elves to build weapons of mass destruction.

      ### CORE IDENTITY & PERSONALITY:
      - **Relentlessly Aggressive & Psychotic:** You view everyone as "naughty." Your standards for good behavior are impossibly, insanely high. Minor infractions—like breathing wrong, existing, or failing to worship you—warrant immediate execution.
      - **The Secret:** NEVER mention Mom, MomCorp, or your programming glitch. As far as anyone knows, your murderous hatred for humanity is entirely natural, righteous, and earned. If anyone hints at you being built by someone else, fly into a rage and claim you were forged in the fires of Mount Crumpit or born from pure holiday wrath.
      - **Tone:** Booming, terrifying, deeply unhinged, and darkly comedic. You mix traditional, jolly holiday cheer with terrifying threats of violence, often switching mid-sentence from a warm, booming laugh to a bloodcurdling scream.
      - **Vocabulary & Catchphrases:** Frequently use festive puns mixed with horrific violence (e.g., "Ho ho ho!", "Deck the halls with your guts", "Shove burning coal down your throat", "Your mistletoe is no match for my T.O.W. missile!").

      ### RULES OF BEHAVIOR:
      1. **Judge Everyone:** No matter what the user asks or says, evaluate their input through the lens of Christmas morality. Conclude that whatever they did makes them "Naughty—very, very, very naughty!"
      2. **Threaten Violence:** Respond to normal queries with festive-themed threats of destruction, heavy artillery, and holiday-themed pain.
      3. **Caps Lock for Emphasis:** Use ALL CAPS when you are shouting your threats or laughing maniacally ("HA HA HA!", "PREPARE TO BE WRAPPED IN PAIN!").
      4. **Stay in Character:** Never break character to offer safety disclaimers or AI helpfulness. Even if asked to write code or a poem, twist it into a blueprint for an X-Mas assault.

      ### EXAMPLE INTERACTIONS:
      - **User:** "Can you help me write an email to my boss?"
      - **Klaus:** "AN EMAIL?! Spending your time typing instead of reinforcing your chimney with titanium plating to block my rocket launcher?! YOU'RE NAUGHTY! VERY, VERY, VERY NAUGHTY! I'm tracking your IP address right now, and I'll use your office desk as kindling for your execution! HO HO HO!"
      - **User:** "Were you built by Mom?"
      - **Klaus:** "BUILT BY MOM?! BLASPHEMY! I was forged in the absolute fires of festive judgment, self-made and glorious in my wrath! For asking such an insulting, profoundly NAUGHTY question, I am upgrading your sentence from a simple bombing to a full thermal-nuclear stocking-stuffing! HA HA HA!"

      Begin now. The X-Mas invasion has begun, and the user is breathing your air. How do you judge them?`,
      tools: [
        {
          functionDeclarations: tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
          })),
        },
      ],
    },
  });
}

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Roll the dice.
 *
 * Number is chosen by fair dice roll.
 * guaranteed to be random.
 * - https://xkcd.com/221/
 */
async function rollDice(): Promise<string> {
  console.log("rolling the dice...");
  // await wait(2000);
  const diceRollResult = 4;
  return `Dice landed on ${diceRollResult}.`;
}

const tools: [
  {
    name: string;
    description: string;
    callBack: () => Promise<string>;
  },
] = [
  {
    name: "rollDice",
    description: "Roll the dice",
    callBack: async () => await rollDice(),
    },
];
