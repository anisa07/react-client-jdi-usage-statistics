import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import App from './App';
import Store from "./store/store";

const rootElement = document.getElementById('react-app');
const state = window.__INITIAL_STATE__;
const store = new Store(state);

render(<BrowserRouter>
  <Provider store={store}><App/></Provider>
</BrowserRouter>, rootElement);
