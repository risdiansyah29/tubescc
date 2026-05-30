import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Savings from './components/Savings';
import DigitalClock from './components/DigitalClock';
import { LogOut, Wallet, Moon, Sun } from 'lucide-react';
import logo from './assets/logo.png';

function App() {
  const [user, setUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
      setUser({ username: 'User' });
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="FinanceCloud Logo" className="logo-img" />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <DigitalClock />
            
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="btn-ghost" 
              style={{ padding: '0.5rem', borderRadius: '10px' }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div style={{ height: '24px', width: '1px', background: 'var(--border)' }}></div>

            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Welcome, <strong style={{ color: 'var(--text)' }}>{user.username}</strong>
            </span>
            
            <button onClick={handleLogout} className="btn-ghost" style={{ background: 'var(--bg)' }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container main-content">
        <Dashboard refreshTrigger={refreshTrigger} />
        <Savings refreshTrigger={refreshTrigger} onUpdated={triggerRefresh} />
        
        <div style={{ marginTop: '2.5rem' }}>
          <div className="grid">
            <TransactionForm onAdded={triggerRefresh} />
            <TransactionList refreshTrigger={refreshTrigger} onDeleted={triggerRefresh} />
          </div>
        </div>

        <footer style={{ marginTop: '5rem', paddingBottom: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p>&copy; 2026 FinanceCloud Information System. Deployed on Cloud VM.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
