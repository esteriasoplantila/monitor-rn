import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import MonitorScreen from './screens/MonitorScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [token, setToken] = useState('');

  return token ? (
    <MonitorScreen token={token} setToken={setToken} />
  ) : (
    <LoginScreen setToken={setToken} />
  );
}