import {IndicatorGraphData, IndicatorValue} from '../types/indicator';
import {IndicatorType} from '../types/navigation';
import {apiClient} from './apiClient';

const isMonthly = (type: IndicatorType): boolean => {
  return type === 'ipc' || type === 'utm';
};

const buildPeriodUrl = (
  type: IndicatorType,
  start: Date,
  end: Date,
): string => {
  const startYear = start.getFullYear();
  const startMonth = (start.getMonth() + 1).toString().padStart(2, '0');
  const endYear = end.getFullYear();
  const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');

  return `/${type}/periodo/${startYear}/${startMonth}/${endYear}/${endMonth}`;
};

export const CmfRepository = {
  getCurrentValue: async (type: IndicatorType): Promise<IndicatorValue[]> => {
    const response = await apiClient.get(`/${type}`);
    const data: IndicatorValue[] = response.data?.[type.toUpperCase()] ?? [];
    return data;
  },

  getLast30Days: async (type: IndicatorType): Promise<IndicatorValue[]> => {
    const today = new Date();
    const end = new Date(today);
    let start: Date;

    if (isMonthly(type)) {
      // Desde el 1 de enero del año actual
      start = new Date(end.getFullYear(), 0, 1);
    } else {
      // Últimos 30 días
      start = new Date(end);
      start.setDate(end.getDate() - 30);
    }

    const response = await apiClient.get(buildPeriodUrl(type, start, end));
    const data: IndicatorValue[] = response.data?.[type.toUpperCase()] ?? [];
    return data;
  },

  getGraphData: async (type: IndicatorType): Promise<IndicatorGraphData> => {
    const today = new Date();
    const end = new Date(today);
    const start = new Date();

    if (isMonthly(type)) {
      start.setMonth(end.getMonth() - 12);
    } else {
      start.setDate(end.getDate() - 10);
    }

    const response = await apiClient.get(buildPeriodUrl(type, start, end));
    const allValues: IndicatorValue[] =
      response.data?.[type.toUpperCase()] ?? [];

    return {
      currentValue: allValues[0],
      values: allValues,
    };
  },
};
