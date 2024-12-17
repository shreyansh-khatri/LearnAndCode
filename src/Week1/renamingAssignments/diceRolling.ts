import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rollDice = (diceSides: number): number => Math.floor(Math.random() * diceSides) + 1;

const main = (): void => {
  const diceSides: number = 6;
  let isDiceRolling: boolean = true;

  while (isDiceRolling) {
    readlineInterface.question("Ready to roll? Enter Q to Quit: ", (enteredValue: string) => {
      if (enteredValue.toLowerCase() !== "q") {
        const diceRollResult: number = rollDice(diceSides);
        console.log("You have rolled a", diceRollResult);
      } else {
        isDiceRolling = false;
        readlineInterface.close();
      }
    });
  }
};

main();
