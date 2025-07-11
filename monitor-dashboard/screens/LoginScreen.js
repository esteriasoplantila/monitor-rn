import React, { useState } from 'react';
import { login } from '../services/api';

export default function LoginScreen({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const token = await login(username, password);
    if (token) {
      setToken(token);
    } else {
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa',
      }}
    >
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: 380 }}>
        <h4 className="mb-3 border-bottom pb-2 text-center">Login</h4>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Email address</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
          Login
        </button>

        <div className="text-center">
          <a href="#" className="me-3 small">Signup</a>
          <a href="#" className="small">Reset Password</a>
        </div>
      </div>
    </div>
  );
}
