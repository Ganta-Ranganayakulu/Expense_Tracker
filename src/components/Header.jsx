import React from 'react';
import { Download, WalletCards } from 'lucide-react';

const Header = ({ onExport }) => {
  return (
    <header className="app-header">
      <div className="brand">
        <WalletCards size={30} />
        <div>
          <span>SpendWise</span>
          <small>Expense Tracker</small>
        </div>
      </div>
      <nav aria-label="Expense tracker navigation">
        <a href="#overview">Overview</a>
        <a href="#add">Add Entry</a>
        <a href="#insights">Insights</a>
        <a href="#records">Records</a>
      </nav>
      <button className="btn ghost" onClick={onExport}>
        <Download size={18} />
        Export
      </button>
    </header>
  );
};

export default Header;
