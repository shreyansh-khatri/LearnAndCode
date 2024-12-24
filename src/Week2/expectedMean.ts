import * as readline from "readline";

async function main() {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const getInput = (prompt: string): Promise<string> => {
    return new Promise((resolve) => readlineInterface.question(prompt, resolve));
  };

  const firstLine = (await getInput("")).split(" ").map(Number);
  const [arrayLength, numberOfQueries] = firstLine;

  const inputArray = (await getInput("")).split(" ").map(Number);

  const cumulativeSum = new Array(arrayLength + 1).fill(0);
  for (let i = 1; i <= arrayLength; i++) {
    cumulativeSum[i] = cumulativeSum[i - 1] + inputArray[i - 1];
  }

  for (let i = 0; i < numberOfQueries; i++) {
    const query = (await getInput("")).split(" ").map(Number);
    const [num1, num2] = query;

    const subarraySum = cumulativeSum[num2] - cumulativeSum[num1 - 1];
    const subarrayLength = num2 - num1 + 1;
    console.log(Math.floor(subarraySum / subarrayLength));
  }

  readlineInterface.close();
}

main();
