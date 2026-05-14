import { useState } from 'react';
import api from '../api';

export default function TransactionForm({ onAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'General',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', { ...formData, date: new Date() });
      setFormData({ title: '', amount: '', type: 'expense', category: 'General', description: '' });
      onAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '1rem' }}>
        <div>
          <label>Title</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        </div>
        <div>
          <label>Amount</label>
          <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
        </div>
        <div>
          <label>Type</label>
          <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" className="btn-primary">Add Transaction</button>
        </div>
      </form>
    </div>
  );
}
