import * as readline from "readline";

class ATMException extends Error {}
class ATMInsufficientCashError extends ATMException {}
class AccountInsufficientFundsError extends ATMException {}
class ServerUnavailableError extends ATMException {}
class CardBlockedError extends ATMException {}
class DailyWithdrawalLimitExceededError extends ATMException {}
class InvalidPinError extends ATMException {}
class AccountNotFoundError extends ATMException {}

interface BankAccount {
  accountNumber: string;
  availableBalance: number;
  dailyWithdrawalLimit: number;
  amountWithdrawnToday: number;
  pin: string;
  failedPinAttempts: number;
  isCardBlocked: boolean;
}

class ATMService {
  private availableCash: number;
  private isServerConnected: boolean = true;

  constructor(initialCash: number) {
    this.availableCash = initialCash;
  }

  public updateServerConnectionStatus(status: boolean): void {
    this.isServerConnected = status;
  }

  private verifyServerConnection(): void {
    if (!this.isServerConnected) {
      throw new ServerUnavailableError(
        "Cannot connect to the server. Please try again later."
      );
    }
  }

  public verifyPin(account: BankAccount, enteredPin: string): void {
    if (account.isCardBlocked) {
      throw new CardBlockedError(
        "This card is blocked due to multiple invalid PIN attempts."
      );
    }

    if (enteredPin !== account.pin) {
      account.failedPinAttempts++;
      if (account.failedPinAttempts >= 3) {
        account.isCardBlocked = true;
        throw new CardBlockedError(
          "Card has been blocked after 3 invalid PIN entries."
        );
      } else {
        throw new InvalidPinError(
          `Incorrect PIN. Attempt ${account.failedPinAttempts}/3.`
        );
      }
    }
    account.failedPinAttempts = 0;
  }

  public processWithdrawal(account: BankAccount, amount: number): void {
    this.verifyServerConnection();

    if (amount > this.availableCash) {
      throw new ATMInsufficientCashError("ATM has insufficient cash.");
    }

    if (amount > account.availableBalance) {
      throw new AccountInsufficientFundsError(
        "Insufficient funds in your account."
      );
    }

    if (account.amountWithdrawnToday + amount > account.dailyWithdrawalLimit) {
      throw new DailyWithdrawalLimitExceededError(
        "Daily withdrawal limit exceeded."
      );
    }

    account.availableBalance -= amount;
    account.amountWithdrawnToday += amount;
    this.availableCash -= amount;

    console.log(`₹${amount} withdrawn successfully.`);
    console.log(`Remaining Balance: ₹${account.availableBalance}`);
  }
}

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => input.question(question, resolve));

const accounts: BankAccount[] = [
  {
    accountNumber: "1001",
    availableBalance: 8000,
    dailyWithdrawalLimit: 5000,
    amountWithdrawnToday: 0,
    pin: "1111",
    failedPinAttempts: 0,
    isCardBlocked: false,
  },
  {
    accountNumber: "2002",
    availableBalance: 12000,
    dailyWithdrawalLimit: 6000,
    amountWithdrawnToday: 0,
    pin: "2222",
    failedPinAttempts: 0,
    isCardBlocked: false,
  },
];

const atm = new ATMService(10000);
async function runATM() {
  try {
    let account: BankAccount | undefined;

    while (!account) {
      const accountNumber = await ask("Enter your Account Number: ");
      account = accounts.find((acc) => acc.accountNumber === accountNumber);

      if (!account) {
        console.log("Account not found. Please try again.\n");
      } else if (account.isCardBlocked) {
        console.log(
          "This card is blocked due to multiple invalid PIN attempts."
        );
        input.close();
        return;
      }
    }

    let authenticated = false;

    while (!authenticated && !account.isCardBlocked) {
      const enteredPin = await ask("Enter your PIN: ");
      try {
        atm.verifyPin(account, enteredPin);
        authenticated = true;
      } catch (error) {
        if (error instanceof CardBlockedError) {
          console.error(error.message);
          input.close();
          return;
        } else if (error instanceof InvalidPinError) {
          console.warn(error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }

    let exit = false;
    while (!exit) {
      console.log("\n Select an option:");
      console.log("1  Check Balance");
      console.log("2  Withdraw Cash");
      console.log("3  Deposit Cash");
      console.log("4  Exit");

      const option = await ask("Choose (1-4): ");

      switch (option.trim()) {
        case "1":
          console.log(`Your current balance is: ₹${account.availableBalance}`);
          break;

        case "2":
          const withdrawAmount = parseInt(
            await ask("Enter amount to withdraw: ")
          );
          if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            console.log("Invalid amount.");
          } else {
            try {
              atm.processWithdrawal(account, withdrawAmount);
            } catch (error) {
              if (error instanceof ATMException) {
                console.error(error.message);
              } else {
                console.error("Unexpected Error:", error);
              }
            }
          }
          break;

        case "3":
          const depositAmount = parseInt(
            await ask("Enter amount to deposit: ")
          );
          if (isNaN(depositAmount) || depositAmount <= 0) {
            console.log("Invalid amount.");
          } else {
            account.availableBalance += depositAmount;
            console.log(
              `₹${depositAmount} deposited successfully. New balance: ₹${account.availableBalance}`
            );
          }
          break;

        case "4":
          console.log("Thank you for using the ATM. Goodbye!");
          exit = true;
          break;

        default:
          console.log("Invalid option. Please select 1-4.");
      }
    }
  } finally {
    input.close();
  }
}

runATM();
