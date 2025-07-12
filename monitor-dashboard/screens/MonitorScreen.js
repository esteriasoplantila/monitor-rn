import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';
import moment from 'moment';
import { PieChart } from 'react-native-chart-kit';
import { getMonitorData } from '../services/api';
import MonitorCard from '../components/MonitorCard';

export default function MonitorScreen({ token, setToken }) {
  const [data, setData] = useState([]);
  const [now, setNow] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const fetchData = () => {
      getMonitorData(token).then(setData).catch(console.error);
    };

    fetchData();

    const clockInterval = setInterval(() => {
      setNow(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    const dataRefreshInterval = setInterval(fetchData, 5 * 60 * 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(dataRefreshInterval);
    };
  }, [token]);

  const total = data.length;
  const normal = data.filter((d) => d.status === 1).length;
  const error = total - normal;

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.dashboard}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Title style={styles.header}>📊 Monitor Dashboard</Title>
          </View>

          <Text style={styles.datetime}>🕒 {now}</Text>
          <Text style={styles.stats}>
            ✅ Normal: {normal} | ❌ Error: {error} | 🔢 Total: {total}
          </Text>

          <PieChart
            data={[
              {
                name: 'Normal',
                population: normal,
                color: '#28a745',
                legendFontColor: '#444',
                legendFontSize: 14,
              },
              {
                name: 'Error',
                population: error,
                color: '#dc3545',
                legendFontColor: '#444',
                legendFontSize: 14,
              },
            ]}
            width={screenWidth - 64}
            height={180}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: () => '#555',
              labelColor: () => '#555',
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Card.Content>
      </Card>

      <View style={styles.cards}>
        {data.length > 0 ? (
          data.map((item) => <MonitorCard key={item.Id} item={item} />)
        ) : (
          <Text style={styles.noData}>No monitor data available.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  dashboard: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  datetime: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  stats: {
    fontSize: 16,
    color: '#222',
    marginVertical: 12,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  noData: {
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
  },
});
