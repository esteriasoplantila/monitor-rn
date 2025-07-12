import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, Card } from 'react-native-paper';

export default function HistoryLogScreen({ token }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>📄 History Logs</Title>
          <Text>This is where you'll show log history from the API.</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
  },
});
