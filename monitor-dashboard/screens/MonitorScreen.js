import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getMonitorData } from '../services/api';
import MonitorCard from '../components/MonitorCard';

export default function MonitorScreen({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonitorData(token).then(setData).catch(console.error);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <MonitorCard key={item.Id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});
