/**
 * Roll the dice.
 *
 * Number is chosen by fair dice roll.
 * guaranteed to be random.
 * - https://xkcd.com/221/
 */
export async function rollDice(): Promise<string> {
  console.log("rolling the dice...");
  // await wait(2000);
  const diceRollResult = 4;
  return `Dice landed on ${diceRollResult}.`;
}
