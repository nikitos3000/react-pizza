import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import EmptyBlock from './pages/NotFound';
import Home from './pages/Home';
import './scss/app.scss';
import Cart from './pages/Cart';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<EmptyBlock />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
