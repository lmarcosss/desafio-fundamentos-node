import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];

    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private getIncomeValue(): number {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') return total + transaction.value;

      return total;
    }, 0);
  }

  private getOutcomeValue(): number {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') return total + transaction.value;

      return total;
    }, 0);
  }

  public getBalance(): Balance {
    this.balance.income = this.getIncomeValue();
    this.balance.outcome = this.getOutcomeValue();
    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
