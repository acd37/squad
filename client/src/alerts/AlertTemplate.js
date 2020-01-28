import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
  svg: {
    fill: '#fff',
    fontSize: '1.2rem',
    marginRight: 12,
    opacity: 0.9,
    width: 20,
    height: 20
  },
  success: {
    backgroundColor: '#fe446c',
    borderRadius: 4,
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    color: '#fff',
    fontSize: '1.2rem',
    letterSpacing: 0.14994,
    lineHeight: '20.02px',
    padding: '28px 32px',
    margin: 24,
    width: 400,
    maxWidth: '100%'
  }
};

export default function AlertTemplate({ options, message }) {
  return (
    <div>
      {options.type === 'success' && (
        <div style={styles.success}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg style={styles.svg} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {message}
          </span>
        </div>
      )}
    </div>
  );
}
