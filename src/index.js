import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './context/dataProvider'
import { StoreProvider } from './context/storeProvider';
import {AuthProvider} from './context/authProvider'
import { ToastProvider } from 'react-toast-notifications'
import './assets/scss/styles.css';
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <DataProvider>
        <Router>
          <AuthProvider>
            <ToastProvider placement="bottom-left" autoDismiss={true} autoDismissTimeout={1500}>
              <App />
            </ToastProvider>
          </AuthProvider>
        </Router>
      </DataProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
