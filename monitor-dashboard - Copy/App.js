import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import MonitorScreen from './screens/MonitorScreen';

export default function App() {
  const [token, setToken] = useState('');

  return token ? (
    <MonitorScreen token={token} />
  ) : (
    <LoginScreen setToken={setToken} />
  );
}
