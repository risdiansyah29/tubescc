import { useState } from 'react';
import api from '../api';
import logo from '../assets/logo.png';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, { username, password });
      localStorage.setItem('token', data.token);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ width: '400px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src={logo} alt="FinanceCloud Logo" className="logo-img" style={{ height: '40px' }} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center', cursor: 'pointer', color: 'var(--primary)' }} 
           onClick={() => {
             setIsLogin(!isLogin);
             setError('');
           }}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </p>
      </div>
    </div>
  );
}
