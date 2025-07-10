import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MonitorCard({ item }) {
  const isSuccess = item.status === 1;

  return (
    <View style={[styles.card, isSuccess ? styles.green : styles.red]}>
      <Text style={styles.title}>{item.item_name}</Text>
      <Text>{new Date(item.datetime).toLocaleString()}</Text>
      <Text>{item.indicator1_name}: {item.indicator1_value}</Text>
      <Text>{item.indicator2_name}: {item.indicator2_value}</Text>
      <Text>{item.indicator3_name}: {item.indicator3_value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    backgroundColor: '#eee',
  },
  green: { backgroundColor: '#d4edda' },
  red: { backgroundColor: '#f8d7da' },
  title: { fontWeight: 'bold', fontSize: 16 },
});
