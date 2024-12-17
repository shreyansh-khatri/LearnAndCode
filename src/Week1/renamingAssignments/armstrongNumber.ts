import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const checkArmstrong = (inputNumber: number): number => {
  let armstrongSum = 0;
  let digitsCount = 0;
  let remainingNumber = inputNumber;

  while (remainingNumber > 0) {
    digitsCount++;
    remainingNumber = Math.floor(remainingNumber / 10);
  }

  remainingNumber = inputNumber;
  while (remainingNumber > 0) {
    const digit = remainingNumber % 10;
    armstrongSum += Math.pow(digit, digitsCount);
    remainingNumber = Math.floor(remainingNumber / 10);
  }

  return armstrongSum;
};

const getUserInput = (): void => {
  readlineInterface.question(
    "\nPlease Enter the Number to Check for Armstrong: ",
    (input: string) => {
      const inputNumber = parseInt(input, 10);

      if (inputNumber === checkArmstrong(inputNumber)) {
        console.log(`\n${inputNumber} is Armstrong Number.\n`);
      } else {
        console.log(`\n${inputNumber} is Not an Armstrong Number.\n`);
      }
      readlineInterface.close();
    }
  );
};

getUserInput();
