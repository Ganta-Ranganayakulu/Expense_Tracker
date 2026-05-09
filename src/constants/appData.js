export const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Education',
  'Travel',
  'Salary',
  'Freelance',
  'Other'
];

export const starterTransactions = [
  {
    id: crypto.randomUUID(),
    title: 'Monthly salary',
    amount: 54000,
    type: 'income',
    category: 'Salary',
    date: new Date().toISOString().slice(0, 10),
    note: 'Primary income'
  },
  {
    id: crypto.randomUUID(),
    title: 'Groceries',
    amount: 2450,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    note: 'Weekly essentials'
  },
  {
    id: crypto.randomUUID(),
    title: 'Electricity bill',
    amount: 1320,
    type: 'expense',
    category: 'Bills',
    date: new Date().toISOString().slice(0, 10),
    note: 'Home utilities'
  }
];

export const emptyTransactionForm = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  note: ''
};
