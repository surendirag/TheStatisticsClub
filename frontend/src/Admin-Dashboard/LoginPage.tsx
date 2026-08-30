import { useState } from "react";
import "./LoginPage.css";

interface AlertState {
  type: 'error' | 'success';
  message: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loading, setLoading] = useState(false);

  const showAlert = (type: 'error' | 'success', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  async function handleSubmit() {
    if (!email || !password) {
      showAlert('error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await resp.json();

      if (resp.ok) {
        showAlert('success', 'Login successful! Redirecting...');
        setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
      } else {
        showAlert('error', data.error || 'Invalid credentials');
      }
    } catch (err) {
      showAlert('error', 'Something went wrong, try again');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        <input
          type="email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}