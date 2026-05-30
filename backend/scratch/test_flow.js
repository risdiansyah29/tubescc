async function test() {
  try {
    // 1. Register/Login
    console.log('Logging in...');
    const loginRes = await fetch('http://localhost:5050/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Token obtained.');

    // 2. Create Transaction
    console.log('Creating transaction...');
    const transRes = await fetch('http://localhost:5050/api/transactions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        title: 'Test Transaction',
        amount: 50000,
        type: 'expense',
        category: 'Food',
        date: new Date()
      })
    });
    const transData = await transRes.json();
    console.log('Transaction created:', transData.id);

    // 3. Get Transactions
    console.log('Fetching transactions...');
    const getRes = await fetch('http://localhost:5050/api/transactions', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const getData = await getRes.json();
    console.log('Transactions count:', getData.length);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

test();
