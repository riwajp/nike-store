import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Main = (props) => {
  const [products, updateProducts] = useState([]);

  if (products.length === 0) {
    fetch("https://riwaj-nike-store.herokuapp.com/get_main_products")
      .then((data) => data.json())
      .then((data) => updateProducts(data));
  }

  const products_render = products.map((product) => (
    <div className="main_big">
      <a>
        <Link to={"/product/" + product._id}>
          <img src={product.image} className="main_img" />
          <br />
          <span className="category_label">
            {product.category} / {product.sub_category}
          </span>
          <br />
          {product.name}
          <br />${product.price}
        </Link>
      </a>
    </div>
  ));
  return (
    <div className="main_container">
      {products.length === 0 ? "" : products_render}
    </div>
  );
};

export default Main;
