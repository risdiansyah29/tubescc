import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Plus, Wallet, LogOut } from 'lucide-react';
import api from '../api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ refreshTrigger }) {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

  useEffect(() => {
    fetchSummary();
  }, [refreshTrigger]);

  const fetchSummary = async () => {
    try {
      const { data } = await api.get('/transactions/summary');
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  };

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [summary.totalIncome, summary.totalExpense],
        backgroundColor: ['#10b981', '#f43f5e'],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="grid">
      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Financial Summary</h3>
        <div style={{ width: '220px' }}>
          <Pie data={data} options={{ plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="card" style={{ borderLeft: '6px solid var(--income)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Income</p>
            <h2 style={{ color: 'var(--income)', marginTop: '0.25rem' }}>Rp {summary.totalIncome.toLocaleString()}</h2>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '12px', color: 'var(--income)' }}>
             <Plus size={24} />
          </div>
        </div>
        <div className="card" style={{ borderLeft: '6px solid var(--expense)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Expense</p>
            <h2 style={{ color: 'var(--expense)', marginTop: '0.25rem' }}>Rp {summary.totalExpense.toLocaleString()}</h2>
          </div>
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '0.75rem', borderRadius: '12px', color: 'var(--expense)' }}>
             <LogOut size={24} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>
        <div className="card" style={{ borderLeft: '6px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Current Balance</p>
            <h2 style={{ marginTop: '0.25rem' }}>Rp {summary.balance.toLocaleString()}</h2>
          </div>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '12px', color: 'var(--primary)' }}>
             <Wallet size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
