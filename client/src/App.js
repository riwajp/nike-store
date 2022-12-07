import "./App.css";
import "./App_mobile.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import AppMain from "./AppMain";
import Admin from "./components/Admin";
import { useState } from "react";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Customize from "./components/Customize";

function App() {
  const [products, updateProducts] = useState([]);
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route
          exact
          path="/"
          element={<AppMain updateProducts={updateProducts} />}
        />
        <Route path="/product/:product_id" element={<Product />} />
        <Route path="/admin" element={<Admin products={products} />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
