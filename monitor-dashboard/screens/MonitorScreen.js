import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { getMonitorData } from '../services/api';
import MonitorCard from '../components/MonitorCard';
import moment from 'moment';
import { PieChart } from 'react-native-chart-kit';


export default function MonitorScreen({ token, setToken }) {
  const [data, setData] = useState([]);
  const [now, setNow] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  

  useEffect(() => {
    const fetchData = () => {
      getMonitorData(token).then(setData).catch(console.error);
    };

    fetchData(); // initial load

    const clockInterval = setInterval(() => {
      setNow(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    const dataRefreshInterval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      clearInterval(clockInterval);
      clearInterval(dataRefreshInterval);
    };
  }, [token]);

  const total = data.length;
  const normal = data.filter((d) => d.status === 1).length;
  const error = total - normal;

  const screenWidth = Dimensions.get('window').width;

  const handleLogout = () => {
    setToken('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>📊 Monitor Dashboard</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout ⎋</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.datetime}>🕒 {now}</Text>
        <Text style={styles.stats}>
          ✅ Normal: {normal} | ❌ Error: {error} | 🔢 Total: {total}
        </Text>

        <PieChart
          data={[
            {
              name: 'Normal',
              population: normal,
              color: '#28a745',
              legendFontColor: '#ccc',
              legendFontSize: 14,
            },
            {
              name: 'Error',
              population: error,
              color: '#dc3545',
              legendFontColor: '#ccc',
              legendFontSize: 14,
            },
          ]}
          width={screenWidth - 32}
          height={180}
          chartConfig={{
            backgroundColor: '#1e1e2f',
            backgroundGradientFrom: '#1e1e2f',
            backgroundGradientTo: '#1e1e2f',
            color: () => `#ccc`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <View style={styles.cards}>
        {data.map((item) => (
          <MonitorCard key={item.Id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1e1e2f', // Kibana-like dark background
    minHeight: '100%',
  },
  dashboard: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#2c2c3e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b3b50',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center',
  },
  datetime: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 16,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
    headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logout: {
    fontSize: 14,
    color: '#ff6666',
    fontWeight: '600',
    padding: 8,
  },
});

