import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// material-ui theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Lato', 'sans-serif'].join(',')
  },
  palette: {
    primary: {
      main: '#fe446c',
      secondary: '#fe6B8B',
      dark: '#1b2531',
      darkAccent: '#24303f',
      contrastText: 'rgb(244, 245, 247)'
    }
  },
  overrides: {
    MuiButton: {
      text: {
        backgroundColor: '#fe446c',
        color: '#fff',
        boxShadow: 'none',
        paddingTop: 10,
        paddingBottom: 10,
        '&:hover': {
          backgroundColor: '#fe6B8B'
        }
      }
    }
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.register();
