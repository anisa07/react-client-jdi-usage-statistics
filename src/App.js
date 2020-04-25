import React from 'react';
import { observer, inject } from "mobx-react";
import { Routes } from './routes';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Modal from './components/Modal/Modal';
import './styles/style.scss';
import './app.scss';

const App = inject('store')(observer((props) => {
  console.log(props);
  return (
    <main className="main">
      <Header />
      {/* <Modal /> */}
      <div className="page-container">
        <Routes />
      </div>
      <Footer />
    </main>
  )
}));

export default App;
