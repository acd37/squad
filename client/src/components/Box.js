import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 30,
    '& > *': {
      margin: theme.spacing(1)
      // width: theme.spacing(16)
      // height: theme.spacing(16)
    },
    boxShadow: '0 0 14px 0 rgba(53,64,82,.05)'
  }
}));

export default function Box(props) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      {props.children}
    </Paper>
  );
}
