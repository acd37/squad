import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertTemplate({ options, message }) {
  return (
    <div>
      {options.type === 'success' && (
        <Alert severity="success" style={{ margin: 24 }}>
          {message}
        </Alert>
      )}
      {options.type === 'info' && (
        <Alert severity="info" style={{ margin: 24 }}>
          {message}
        </Alert>
      )}
      {options.type === 'error' && (
        <Alert severity="error" style={{ margin: 24 }}>
          {message}
        </Alert>
      )}
    </div>
  );
}
