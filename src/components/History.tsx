import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { ConversionRecord } from '../types/currency';

interface HistoryProps {
  history: ConversionRecord[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Conversion History</Card.Title>
        {history.length === 0 ? (
          <p>No conversion history yet.</p>
        ) : (
          <ListGroup variant="flush">
            {history.map((record, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{record.amount} {record.from}</strong> →{' '}
                    <strong>{record.convertedAmount.toFixed(2)} {record.to}</strong>
                    <div className="text-muted small">{formatDate(record.date)}</div>
                  </div>
                  <Badge bg="light" text="dark">
                    1 {record.from} = {(record.convertedAmount / record.amount).toFixed(6)} {record.to}
                  </Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default History;