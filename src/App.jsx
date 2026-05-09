import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import HeroBudget from './components/HeroBudget.jsx';
import SummaryGrid from './components/SummaryGrid.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import InsightsPanel from './components/InsightsPanel.jsx';
import RecordsSection from './components/RecordsSection.jsx';
import Footer from './components/Footer.jsx';
import { categories, emptyTransactionForm } from './constants/appData.js';
import { exportTransactionsCsv } from './utils/exportCsv.js';
import { monthKey } from './utils/formatters.js';
import { getSavedBudget, getSavedTransactions, saveBudgetLimit, saveTransactions } from './utils/storage.js';

const App = () => {
  const [transactions, setTransactions] = useState(getSavedTransactions);
  const [budget, setBudget] = useState(getSavedBudget);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [form, setForm] = useState(emptyTransactionForm);

  const persistTransactions = (items) => {
    setTransactions(items);
    saveTransactions(items);
  };

  const saveBudget = (value) => {
    const nextBudget = Math.max(0, Number(value));
    setBudget(nextBudget);
    saveBudgetLimit(nextBudget);
  };

  const addTransaction = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!form.title.trim() || !amount || amount <= 0) {
      return;
    }

    const transaction = {
      ...form,
      id: crypto.randomUUID(),
      title: form.title.trim(),
      amount
    };

    persistTransactions([transaction, ...transactions]);
    setForm({
      ...emptyTransactionForm,
      date: new Date().toISOString().slice(0, 10)
    });
  };

  const deleteTransaction = (id) => {
    persistTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = `${transaction.title} ${transaction.note} ${transaction.category}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
      const matchesMonth = monthKey(transaction.date) === selectedMonth;
      return matchesSearch && matchesType && matchesCategory && matchesMonth;
    });
  }, [transactions, search, typeFilter, categoryFilter, selectedMonth]);

  const totals = useMemo(() => {
    const monthly = transactions.filter((transaction) => monthKey(transaction.date) === selectedMonth);
    const income = monthly
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = monthly
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const balance = income - expense;
    const budgetUsed = budget ? Math.min(100, Math.round((expense / budget) * 100)) : 0;
    return { income, expense, balance, budgetUsed, remaining: budget - expense };
  }, [transactions, selectedMonth, budget]);

  const categoryTotals = useMemo(() => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === 'expense' && monthKey(transaction.date) === selectedMonth
    );

    return categories
      .map((category) => ({
        category,
        total: expenses
          .filter((transaction) => transaction.category === category)
          .reduce((sum, transaction) => sum + transaction.amount, 0)
      }))
      .filter((entry) => entry.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [transactions, selectedMonth]);

  return (
    <div className="app-shell">
      <Header onExport={() => exportTransactionsCsv(filteredTransactions, selectedMonth)} />

      <main>
        <HeroBudget budget={budget} totals={totals} onBudgetChange={saveBudget} />
        <SummaryGrid totals={totals} budget={budget} />

        <section className="workspace">
          <TransactionForm form={form} setForm={setForm} onSubmit={addTransaction} />
          <InsightsPanel categoryTotals={categoryTotals} totalExpense={totals.expense} />
        </section>

        <RecordsSection
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
