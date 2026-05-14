import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2 } from 'lucide-react';

export default function Savings({ refreshTrigger, onUpdated }) {
  const [savings, setSavings] = useState([]);
  const [newGoal, setNewGoal] = useState({ goalName: '', targetAmount: '', deadline: '' });
  const [addAmount, setAddAmount] = useState({});

  useEffect(() => {
    fetchSavings();
  }, [refreshTrigger]);

  const fetchSavings = async () => {
    try {
      const { data } = await api.get('/savings');
      setSavings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post('/savings', newGoal);
      setNewGoal({ goalName: '', targetAmount: '', deadline: '' });
      fetchSavings();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMoney = async (id) => {
    try {
      await api.patch(`/savings/${id}/add`, { amount: addAmount[id] || 0 });
      setAddAmount({ ...addAmount, [id]: '' });
      fetchSavings();
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGoal = async (id) => {
    if (window.confirm('Delete this saving goal?')) {
      try {
        await api.delete(`/savings/${id}`);
        fetchSavings();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="card">
        <h3>Savings Goals (Tabungan)</h3>
        <form onSubmit={createGoal} className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '1rem', marginBottom: '2rem' }}>
          <div>
            <label>Goal Name</label>
            <input type="text" value={newGoal.goalName} onChange={(e) => setNewGoal({...newGoal, goalName: e.target.value})} required />
          </div>
          <div>
            <label>Target Amount</label>
            <input type="number" value={newGoal.targetAmount} onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})} required />
          </div>
          <div>
            <label>Deadline</label>
            <input type="date" value={newGoal.deadline} onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Create Goal</button>
          </div>
        </form>

        <div className="grid">
          {savings.map((s) => {
            const progress = Math.min((s.currentAmount / s.targetAmount) * 100, 100);
            return (
              <div key={s.id} className="card" style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0 }}>{s.goalName}</h4>
                  <button onClick={() => deleteGoal(s.id)} style={{ background: 'none', color: 'var(--expense)', padding: 0 }}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Target: Rp {parseFloat(s.targetAmount).toLocaleString()}
                </p>
                {s.deadline && (
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Deadline: {new Date(s.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
                <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', margin: '0.5rem 0', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--primary)', width: `${progress}%`, transition: 'width 0.3s' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <span>Rp {parseFloat(s.currentAmount).toLocaleString()}</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="number" 
                    placeholder="Add amount" 
                    value={addAmount[s.id] || ''} 
                    onChange={(e) => setAddAmount({...addAmount, [s.id]: e.target.value})}
                    style={{ marginTop: 0 }}
                  />
                  <button onClick={() => handleAddMoney(s.id)} className="btn-primary" style={{ padding: '0.5rem' }}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
