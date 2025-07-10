import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { login } from '../services/api';

export default function LoginScreen({ setToken }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  const handleLogin = async () => {
    const token = await login(username, password);
    if (token) setToken(token);
    else alert('Login failed');
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" style={styles.input} value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
