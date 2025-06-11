export interface IndicatorValue {
  Fecha: string;
  Valor: string;
}

export interface IndicatorGraphData {
  currentValue: IndicatorValue;
  values: IndicatorValue[];
}
