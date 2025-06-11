import React, {JSX, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import {CmfRepository} from '../api/cmfRepository';
import {RootStackParamList} from '../types/navigation';
import {IndicatorValue} from '../types/indicator';

type ChartDetailRoute = RouteProp<RootStackParamList, 'ChartDetail'>;

export const ChartDetailScreen = (): JSX.Element => {
  const route = useRoute<ChartDetailRoute>();
  const {type, label} = route.params;

  const [data, setData] = useState<IndicatorValue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentValue, setCurrentValue] = useState<IndicatorValue | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {values, currentValue} = await CmfRepository.getGraphData(type);
      setData(values.reverse()); // Mostrar datos del más antiguo al más reciente
      setCurrentValue(currentValue);
      setLoading(false);
    };

    fetchData();
  }, [type]);

  const formatCurrency = (val: string): string =>
    val.replace('.', '').replace(',', '.');

  const numericData: number[] = data.map(d =>
    parseFloat(formatCurrency(d.Valor)),
  );

  if (loading || !currentValue) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>${currentValue.Valor}</Text>
      <Text style={styles.subLabel}>{label}</Text>
      <Text style={styles.detail}>Fecha: {currentValue.Fecha}</Text>
      <Text style={styles.detail}>Unidad de Medida: Pesos</Text>

      <View style={styles.chartContainer}>
        <YAxis
          data={numericData}
          contentInset={{top: 20, bottom: 20}}
          svg={{fontSize: 10, fill: '#999'}}
          numberOfTicks={5}
          formatLabel={(value: number): string => `$${value}`}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{height: 200}}
            data={numericData}
            svg={{stroke: '#007aff', strokeWidth: 2}}
            contentInset={{top: 20, bottom: 20}}
            curve={shape.curveMonotoneX}>
            <Grid />
          </LineChart>
          <XAxis
            data={numericData}
            formatLabel={(_value: number, index: number): string =>
              data[index]?.Fecha?.slice(5) ?? ''
            }
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: '#999'}}
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007aff',
  },
  subLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    marginTop: 24,
    height: 220,
    width: '100%',
    paddingRight: 16,
  },
});
