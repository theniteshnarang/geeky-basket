import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './context/dataContext'
import { StoreProvider } from './context/storeContext'
import './assets/scss/styles.css';
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
