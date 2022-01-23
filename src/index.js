import React from "react";
import { BrowserRouter as Router, useHistory, useLocation  } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'


import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/app.scss';

import App from './App';
import store from './store';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    primary: {
      light: '#bbdefb',
      main: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    success: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    }
  },
});


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  , document.getElementById('app'));

serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();
reportWebVitals();
