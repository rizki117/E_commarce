








//bagian components/ErrorMessage.jsx

import React from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorMessage({ message }) {
  return (
    <Alert variant="danger">
      {message}
    </Alert>
  );
}

export default ErrorMessage;

