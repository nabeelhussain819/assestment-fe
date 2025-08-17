import { useState, useEffect } from 'react';
import axios from 'axios';
import { Currency, ConversionResult, ConversionRecord } from '../types/currency';

const API_BASE_URL = 'http://localhost:5000/api/currency';

export const useCurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/currencies`);
        const data = response.data;
        const currencyList = Object.keys(data).map(code => ({
          code,
          name: data[code].name
        }));
        setCurrencies(currencyList);
      } catch (err) {
        setError('Failed to fetch currencies');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const convertCurrency = async (from: string, to: string, amount: number) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/convert`, {
        from,
        to,
        amount
      });
      await fetchHistory();
      return response.data;
    } catch (err) {
      setError('Failed to convert currency');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    currencies,
    loading,
    error,
    convertCurrency,
    history
  };
};