import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Footer from "./components/Footer";

function App(props) {
  return (
    <div className="App">
      <Nav />
      <Home updateProducts={props.updateProducts} />
      <Footer />
    </div>
  );
}

export default App;
