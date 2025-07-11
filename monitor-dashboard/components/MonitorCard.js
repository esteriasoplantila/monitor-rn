import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MonitorCard({ item }) {
  const isSuccess = item.status === 1;

  return (
    <View style={[styles.card, item.status === 1 ? styles.green : styles.red]}>
      <Text style={styles.title}>{item.item_name}</Text>
      <Text style={styles.subtitle}>{item.indicator1_name}: {item.indicator1_value}</Text>
      <Text style={styles.subtitle}>{item.indicator2_name}: {item.indicator2_value}</Text>
      <Text style={styles.subtitle}>{item.indicator3_name}: {item.indicator3_value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '30%',
    margin: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // for Android shadow
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  green: {
    backgroundColor: '#e9f7ef', // soft success tone
    borderLeftWidth: 5,
    borderLeftColor: '#28a745',
  },
  red: {
    backgroundColor: '#fbeaea', // soft danger tone
    borderLeftWidth: 5,
    borderLeftColor: '#dc3545',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
