import React from 'react';
import { formatCurrency } from '../utils/formatters.js';

const InsightsPanel = ({ categoryTotals, totalExpense }) => {
  return (
    <aside className="insights-card" id="insights">
      <div className="section-title">
        <span className="eyebrow">Spending insights</span>
        <h2>Top categories</h2>
      </div>
      {categoryTotals.length === 0 ? (
        <p className="empty-text">No expense categories for this month yet.</p>
      ) : (
        <div className="category-list">
          {categoryTotals.map((entry) => (
            <div className="category-row" key={entry.category}>
              <div>
                <strong>{entry.category}</strong>
                <span>{formatCurrency(entry.total)}</span>
              </div>
              <div className="mini-bar">
                <span style={{ width: `${Math.max(8, (entry.total / totalExpense) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default InsightsPanel;
