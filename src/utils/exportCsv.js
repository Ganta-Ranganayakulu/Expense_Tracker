export const exportTransactionsCsv = (transactions, selectedMonth) => {
  const header = ['Title', 'Type', 'Category', 'Amount', 'Date', 'Note'];
  const rows = transactions.map((transaction) => [
    transaction.title,
    transaction.type,
    transaction.category,
    transaction.amount,
    transaction.date,
    transaction.note
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `spendwise-${selectedMonth}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
