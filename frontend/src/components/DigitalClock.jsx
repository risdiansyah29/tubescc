import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      padding: '0.5rem 1rem', 
      background: 'var(--card-bg)', 
      color: 'var(--primary)',
      borderRadius: '10px',
      fontFamily: 'monospace',
      fontSize: '1rem',
      fontWeight: '800',
      border: '1px solid var(--border)'
    }}>
      <Clock size={18} />
      <span>{time.toLocaleTimeString()}</span>
    </div>
  );
};

export default DigitalClock;
