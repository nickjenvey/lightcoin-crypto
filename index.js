class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const i of this.transactions) {
      balance += i.value;
    }
    return balance;
  }

  addTransaction(transactions) {
    this.transactions.push(transactions);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Neezy Boscreezy");

console.log("Beginning Balance:", myAccount.balance);

t1 = new Deposit(120, myAccount);
t1.commit();
console.log("Current Balance:", myAccount.balance);

t2 = new Withdrawal(60, myAccount);
t2.commit();
console.log("Current Balance:", myAccount.balance);

t3 = new Withdrawal(60, myAccount);
t3.commit();
console.log("Current Balance:", myAccount.balance);

t4 = new Withdrawal(60, myAccount);
t4.commit();
console.log("Trying to withdrawal another 60 should not work");
console.log("Current Balance:", myAccount.balance);

console.log("Final Balance:", myAccount.balance);