import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Landmark, Target } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const SummaryGrid = ({ totals, budget }) => {
  return (
    <section className="summary-grid">
      <article className="summary-card income">
        <ArrowUpCircle />
        <span>Income</span>
        <strong>{formatCurrency(totals.income)}</strong>
      </article>
      <article className="summary-card expense">
        <ArrowDownCircle />
        <span>Expenses</span>
        <strong>{formatCurrency(totals.expense)}</strong>
      </article>
      <article className="summary-card balance">
        <Landmark />
        <span>Balance</span>
        <strong>{formatCurrency(totals.balance)}</strong>
      </article>
      <article className="summary-card budget">
        <Target />
        <span>Budget</span>
        <strong>{formatCurrency(budget)}</strong>
      </article>
    </section>
  );
};

export default SummaryGrid;
