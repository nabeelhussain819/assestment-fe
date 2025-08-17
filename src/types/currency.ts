export interface Currency {
  code: string;
  name: string;
}

export interface ConversionResult {
  convertedAmount: number;
  rate: number;
}

export interface ConversionRecord {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  date: string;
}