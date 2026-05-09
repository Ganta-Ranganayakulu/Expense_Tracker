import { starterTransactions } from '../constants/appData.js';

export const getSavedTransactions = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('spendwiseTransactions') || 'null');
    return Array.isArray(saved) ? saved : starterTransactions;
  } catch (error) {
    localStorage.removeItem('spendwiseTransactions');
    return starterTransactions;
  }
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('spendwiseTransactions', JSON.stringify(transactions));
};

export const getSavedBudget = () => {
  const value = Number(localStorage.getItem('spendwiseBudget'));
  return Number.isFinite(value) && value > 0 ? value : 25000;
};

export const saveBudgetLimit = (budget) => {
  localStorage.setItem('spendwiseBudget', String(budget));
};
