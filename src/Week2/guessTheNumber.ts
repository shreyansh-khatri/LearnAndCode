import * as readline from "readline";

function isValidInput(s: string): boolean {
  const num = parseInt(s, 10);
  return !isNaN(num) && num >= 1 && num <= 100;
}

async function main() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let guessed = false;
  let numGuesses = 0;
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const getInput = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      readlineInterface.question(prompt, resolve);
    });
  };

  while (!guessed) {
    let guess = await getInput("Guess a number between 1 and 100: ");

    if (!isValidInput(guess)) {
      console.log(
        "I won't count this one. Please enter a number between 1 and 100."
      );
      continue;
    }

    numGuesses++;
    const guessedNumber = parseInt(guess, 10);

    if (guessedNumber < randomNumber) {
      console.log("Too low. Guess again.");
    } else if (guessedNumber > randomNumber) {
      console.log("Too high. Guess again.");
    } else {
      console.log(`You guessed it in ${numGuesses} guesses!`);
      guessed = true;
    }
  }

  readlineInterface.close();
}

main();
