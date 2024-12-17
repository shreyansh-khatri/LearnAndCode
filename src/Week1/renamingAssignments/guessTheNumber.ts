import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isValidNumber = (s: string): boolean => {
  return /^\d+$/.test(s) && parseInt(s, 10) >= 1 && parseInt(s, 10) <= 100;
};

const askForGuess = (randomNumber: number, numberOfGuesses: number): void => {
  readlineInterface.question(
    "Guess a number between 1 and 100: ",
    (guessedValue: string) => {
      if (!isValidNumber(guessedValue)) {
        console.log(
          "I won't count this one. Please enter a number between 1 and 100."
        );
        askForGuess(randomNumber, numberOfGuesses); 
      } else {
        numberOfGuesses++; 
        const guess = parseInt(guessedValue, 10);

        if (guess < randomNumber) {
          console.log("Too low. Guess again.");
          askForGuess(randomNumber, numberOfGuesses); 
        } else if (guess > randomNumber) {
          console.log("Too high. Guess again.");
          askForGuess(randomNumber, numberOfGuesses);
        } else {
          console.log(`You guessed it in ${numberOfGuesses} guesses!`);
          readlineInterface.close(); 
        }
      }
    }
  );
};

const main = (): void => {
  const randomNumber: number = Math.floor(Math.random() * 100) + 1;
  let numberOfGuesses: number = 0; 

  askForGuess(randomNumber, numberOfGuesses);
};

main();
