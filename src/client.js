import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import App from './App';
import store from "./store/store";

const rootElement = document.getElementById('react-app');

render(<BrowserRouter>
  <Provider store={store}><App/></Provider>
</BrowserRouter>, rootElement);
