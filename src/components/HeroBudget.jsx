import React from 'react';
import { formatCurrency } from '../utils/formatters.js';

const HeroBudget = ({ budget, totals, onBudgetChange }) => {
  return (
    <section className="hero" id="overview">
      <div className="hero-copy">
        <span className="eyebrow">Personal finance made clear</span>
        <h1>Track income, control expenses, and stay inside your monthly budget.</h1>
        <p>
          A focused expense tracker for daily spending, category insights, budget planning,
          and clean financial records.
        </p>
      </div>
      <div className="budget-panel">
        <span className="eyebrow">Monthly budget</span>
        <label htmlFor="budget">Budget limit</label>
        <input
          id="budget"
          type="number"
          min="0"
          value={budget}
          onChange={(event) => onBudgetChange(event.target.value)}
        />
        <div className="progress-track">
          <span style={{ width: `${totals.budgetUsed}%` }} />
        </div>
        <strong>{totals.budgetUsed}% used</strong>
        <p>
          {totals.remaining >= 0
            ? `${formatCurrency(totals.remaining)} remaining`
            : `${formatCurrency(Math.abs(totals.remaining))} over budget`}
        </p>
      </div>
    </section>
  );
};

export default HeroBudget;
