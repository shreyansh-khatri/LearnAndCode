import * as readline from "readline";

const adjacentCountriesInformation: { [key: string]: string[] } = {
  IN: ["Pakistan", "China", "Nepal", "Bangladesh", "Bhutan", "Myanmar"],
  US: ["Canada", "Mexico"],
  NL: ["Belgium", "Germany", "Luxembourg"],
  CH: ["Germany", "France", "Italy", "Austria", "Liechtenstein"],
  JP: ["Russia", "North Korea", "South Korea", "China"],
};

const getAdjacentCountries = (countryCode: string): string[] => {
  return (
    adjacentCountriesInformation[countryCode.toUpperCase()] || ["Unknown Country Code"]
  );
};

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.question(
  "Enter the Country Code (e.g., IN/US/NZ): ",
  (countryCode) => {
    const adjacentCountries = getAdjacentCountries(countryCode);
    console.log(`Adjacent Countries: ${adjacentCountries.join(", ")}`);
    readlineInterface.close();
  }
);
