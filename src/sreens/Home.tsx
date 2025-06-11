// src/screens/HomeScreen.tsx
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {CmfRepository} from '../api/cmfRepository';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const indicators: {
  label: string;
  type: 'dolar' | 'euro' | 'ipc' | 'uf' | 'utm';
}[] = [
  {label: 'Dólar', type: 'dolar'},
  {label: 'Euro', type: 'euro'},
  {label: 'IPC', type: 'ipc'},
  {label: 'UF', type: 'uf'},
  {label: 'UTM', type: 'utm'},
];

export const HomeScreen = () => {
  const [data, setData] = useState<Record<string, any>>({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchIndicators = async () => {
      const results: Record<string, any> = {};
      for (const {type} of indicators) {
        try {
          const value = await CmfRepository.getCurrentValue(type);
          results[type] = value[0]; // el valor más reciente
        } catch (e) {
          results[type] = {Valor: 'Error'};
        }
      }
      setData(results);
    };

    fetchIndicators();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {indicators.map(({label, type}) => (
        <TouchableOpacity
          key={type}
          style={styles.card}
          onPress={() => navigation.navigate('Detail', {type, label})}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{data[type]?.Valor || '...'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 24,
    marginTop: 8,
  },
});
