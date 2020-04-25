import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import App from './App';

const rootElement = document.getElementById('react-app');

ReactDOM.hydrate(<BrowserRouter>
  <App />
</BrowserRouter>, rootElement);
