import Header from "./components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import EmptyBlock from "./pages/NotFound.tsx";
import Home from "./pages/Home.tsx";
import "./scss/app.scss";
import Cart from "./pages/Cart.tsx";
import { Description } from "./pages/description.tsx";
import React from "react";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/descript/:id" element={<Description />} />
          <Route path="" element={<EmptyBlock />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
