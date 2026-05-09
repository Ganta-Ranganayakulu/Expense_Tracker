import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, CalendarDays, Search, Trash2 } from 'lucide-react';
import { categories } from '../constants/appData.js';
import { formatCurrency } from '../utils/formatters.js';

const RecordsSection = ({
  selectedMonth,
  setSelectedMonth,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  transactions,
  onDelete
}) => {
  return (
    <section className="records-section" id="records">
      <div className="section-title row-title">
        <div>
          <span className="eyebrow">Transaction records</span>
          <h2>Review and filter entries</h2>
        </div>
        <div className="month-picker">
          <CalendarDays size={18} />
          <input type="month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} />
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, note, category" />
        </div>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p className="empty-text">No transactions match the selected filters.</p>
        ) : (
          transactions.map((transaction) => (
            <article className="transaction-card" key={transaction.id}>
              <div className={`type-icon ${transaction.type}`}>
                {transaction.type === 'income' ? <ArrowUpCircle size={21} /> : <ArrowDownCircle size={21} />}
              </div>
              <div className="transaction-main">
                <h3>{transaction.title}</h3>
                <p>{transaction.category} | {transaction.date} {transaction.note ? `| ${transaction.note}` : ''}</p>
              </div>
              <strong className={transaction.type}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </strong>
              <button className="icon-button danger" onClick={() => onDelete(transaction.id)} title="Delete transaction">
                <Trash2 size={18} />
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default RecordsSection;
