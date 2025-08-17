import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Converter from "./components/Converter";
import History from "./components/History";
import { useCurrencyConverter } from "./hooks/useCurrencyConverter";
import "./App.css";

const App: React.FC = () => {
  const { currencies, loading, error, convertCurrency, history } =
    useCurrencyConverter();
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <Converter
        currencies={currencies}
        loading={loading}
        error={error}
        onConvert={convertCurrency}
      />
      <History history={history} />
    </Container>
  );
};

export default App;
