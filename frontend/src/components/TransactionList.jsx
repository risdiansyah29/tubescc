import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../api';

export default function TransactionList({ refreshTrigger, onDeleted }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions');
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      try {
        await api.delete(`/transactions/${id}`);
        onDeleted();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="card">
      <h3>Recent Transactions</h3>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Date</th>
              <th style={{ padding: '0.75rem' }}>Title</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Type</th>
              <th style={{ padding: '0.75rem' }}>Amount</th>
              <th style={{ padding: '0.75rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem' }}>{new Date(t.date).toLocaleString()}</td>
                <td style={{ padding: '0.75rem' }}>{t.title}</td>
                <td style={{ padding: '0.75rem' }}>{t.category}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span className={`badge badge-${t.type}`}>{t.type}</span>
                </td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: t.type === 'income' ? 'var(--income)' : 'var(--expense)' }}>
                  {t.type === 'income' ? '+' : '-'} Rp {parseFloat(t.amount).toLocaleString()}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <button onClick={() => deleteTransaction(t.id)} style={{ background: 'none', color: 'var(--expense)' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
