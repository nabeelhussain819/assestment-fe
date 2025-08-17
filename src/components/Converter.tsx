import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Alert, Badge } from "react-bootstrap";
import Loader from "./Loader";
import { Currency } from "../types/currency";
interface ConverterProps {
  currencies: Currency[];
  loading: boolean;
  error: string | null;
  onConvert: (from: string, to: string, amount: number) => Promise<any>;
}

interface ConversionResult {
  convertedAmount: number;
  rate: number;
}

const Converter: React.FC<ConverterProps> = ({
  currencies,
  loading,
  error,
  onConvert,
}) => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<string>("1");
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber)) {
        return;
      }
      const conversionResult = await onConvert(
        fromCurrency,
        toCurrency,
        amountNumber
      );
      setResult(conversionResult);
    } catch (err) {
      console.error(err);
    }
  };

  const swapCurrencies = async () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    const amountNumber = parseFloat(amount);
    const conversionResult = await onConvert(
      toCurrency,
      fromCurrency,
      amountNumber
    );
    setResult(conversionResult);
  };

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Title className="mb-0 text-primary fw-bold">
            Currency Converter
          </Card.Title>
          <Badge bg="light" text="dark" className="fs-6">
            Real-time Rates
          </Badge>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-4 g-3 align-items-end">
            <Col xs={12} md={5}>
              <Form.Group controlId="fromCurrency">
                <Form.Label className="fw-medium text-muted">From</Form.Label>
                <Form.Select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  disabled={loading}
                  className="py-2"
                >
                  {currencies.map((currency) => (
                    <option key={`from-${currency.code}`} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={2} className="text-center">
              <Button
                variant="outline-secondary"
                onClick={swapCurrencies}
                disabled={loading}
                className="my-3 my-md-0"
              >
                ⇄
              </Button>
            </Col>

            <Col xs={12} md={5}>
              <Form.Group controlId="toCurrency">
                <Form.Label className="fw-medium text-muted">To</Form.Label>
                <Form.Select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  disabled={loading}
                  className="py-2"
                >
                  {currencies.map((currency) => (
                    <option key={`to-${currency.code}`} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="amount">
                <Form.Label className="fw-medium text-muted">Amount</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    {fromCurrency}
                  </span>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    disabled={loading}
                    className="py-2"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              size="lg"
              className="fw-bold py-2"
            >
              {loading ? "Converting..." : "Convert"}
            </Button>
          </div>

          {loading && <Loader />}

          {result && (
            <div className="mt-4 p-3 bg-light rounded">
              <div className="text-center mb-2">
                <div className="fs-5 text-muted">
                  {amount} {fromCurrency} =
                </div>
                <div className="display-5 fw-bold text-success">
                  {result.convertedAmount.toFixed(2)} {toCurrency}
                </div>
              </div>
              <div className="text-center small text-muted">
                1 {fromCurrency} = {result.rate.toFixed(6)} {toCurrency}
              </div>
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Converter;
