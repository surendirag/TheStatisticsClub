// client/src/App.jsx
import { useEffect, useState } from 'react';
import LoginPage from './Admin-Dashboard/LoginPage';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(data => setMsg(data.message));
  }, []);

  return <div><LoginPage /><h1>{msg}</h1></div>;
}

export default App;