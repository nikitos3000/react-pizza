import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import EmptyBlock from './pages/NotFound';
import Home from './pages/Home';
import './scss/app.scss';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<EmptyBlock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
