//Index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Pages/JS/Routes'; // Import the Router component
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
