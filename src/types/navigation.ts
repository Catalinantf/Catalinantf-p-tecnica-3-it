export type IndicatorType = 'dolar' | 'euro' | 'ipc' | 'uf' | 'utm';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    type: IndicatorType;
    label: string;
  };
  ChartDetail: {
    type: IndicatorType;
    label: string;
  };
};
