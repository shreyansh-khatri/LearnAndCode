class Wallet {
  private value: number;

  constructor(initialValue: number) {
    this.value = initialValue;
  }

  getTotalMoney(): number {
    return this.value;
  }

  private subtractMoney(amount: number): boolean {
    if (this.value >= amount) {
      this.value -= amount;
      return true;
    }
    return false;
  }

  addMoney(amount: number): void {
    this.value += amount;
  }

  processPayment(amount: number): boolean {
    return this.subtractMoney(amount);
  }
}

class Customer {
  private firstName: string;
  private lastName: string;
  private myWallet: Wallet;

  constructor(firstName: string, lastName: string, initialMoney: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.myWallet = new Wallet(initialMoney);
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  checkBalance(): number {
    return this.myWallet.getTotalMoney();
  }

  makePayment(amount: number): boolean {
    return this.myWallet.processPayment(amount);
  }

  addFunds(amount: number): void {
    this.myWallet.addMoney(amount);
  }
}

const myCustomer = new Customer("Shreyansh", "Khatri", 10.0);
const payment = 2.0;

if (myCustomer.makePayment(payment)) {
  console.log("Payment received!");
} else {
  console.log("Come back later for payment.");
}

/*
- The original 'Customer' class exposed 'getWallet()', allowing direct access to wallet operations.
- This*broke encapsulation, making it possible to modify the wallet from outside.
- The improved version removes 'getWallet()', adding controlled methods ('makePayment()', 'checkBalance()', 'addFunds()').
- Now, the wallet is fully encapsulated, ensuring better security and data integrity.
*/
