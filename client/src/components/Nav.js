import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const Nav = (props) => {
  const [edit_sub_category, update_edit_sub_category] = useState("");

  var cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  const cart_render = cart.map((cart_item) => (
    <div style={{ width: "100%" }}>
      {cart_item.name}
      {cart_item.image}
    </div>
  ));
  return (
    <div className="nav_bar_container">
      <img
        src="https://www.freeiconspng.com/uploads/nike-logo-png-shoes-brand-17.png"
        className="nav_logo"
      />
      <div className="nav_links">
        <span className="nav_link">
          <a href="">
            <Link to="/">Home</Link>
          </a>
        </span>
      </div>
      <div className="nav_banner">
        <i className="just_do_it">JUST DO IT </i>
      </div>

      <span className="icons">
        <a>
          <Link to="/admin">
            <img
              src="https://img.icons8.com/fluency-systems-regular/50/000000/guest-male.png"
              className="icon"
            />
          </Link>
        </a>
        <a>
          <Link to="/cart">
            <img
              src="https://img.icons8.com/external-those-icons-lineal-those-icons/96/000000/external-cart-shopping-actions-those-icons-lineal-those-icons-4.png"
              className="icon"
            />
          </Link>
        </a>
      </span>
    </div>
  );
};
export default Nav;
