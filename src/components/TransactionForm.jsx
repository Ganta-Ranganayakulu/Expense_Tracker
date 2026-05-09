import React from 'react';
import { Plus } from 'lucide-react';
import { categories } from '../constants/appData.js';

const TransactionForm = ({ form, setForm, onSubmit }) => {
  return (
    <form className="form-card" id="add" onSubmit={onSubmit}>
      <div className="section-title">
        <span className="eyebrow">New transaction</span>
        <h2>Add income or expense</h2>
      </div>
      <div className="form-grid">
        <label>
          Title
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="Rent, salary, groceries"
            required
          />
        </label>
        <label>
          Amount
          <input
            type="number"
            min="1"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: event.target.value })}
            placeholder="2500"
            required
          />
        </label>
        <label>
          Type
          <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label>
          Category
          <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
          />
        </label>
        <label className="wide-field">
          Note
          <input
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
            placeholder="Optional note"
          />
        </label>
      </div>
      <button className="btn primary full">
        <Plus size={18} />
        Add transaction
      </button>
    </form>
  );
};

export default TransactionForm;
