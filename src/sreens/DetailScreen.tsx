import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CmfRepository} from '../api/cmfRepository';
import {RootStackParamList} from '../types/navigation';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const {type, label} = route.params;
  const [history, setHistory] = useState<{Fecha: string; Valor: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await CmfRepository.getLast30Days(type);
      setHistory(result);
    };

    fetchData();
  }, [type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimos 30 días: {label}</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => `${index}-${item.Fecha}`}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.date}>{item.Fecha}</Text>
            <Text style={styles.value}>{item.Valor}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 18,
  },
});
