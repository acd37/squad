import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        height: '100vh',
        width: 300,
        margin: '0 auto',
        maxWidth: '90%'
      }}
    >
      <p style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>404</p>
      <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Page not found.</p>
      <p>The page you are looking for might have been removed or does not exist yet.</p>
      <Button fullWidth className={classes.button} onClick={() => history.push('/')}>
        Return to website
      </Button>
    </div>
  );
}
