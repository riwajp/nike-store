import Nav from "./Nav";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Footer from "./Footer";
const Cart = () => {
  const [random, update_random] = useState("000");
  const [cart, updateCart] = useState("");
  var cart_temp = localStorage.getItem("cart");
  if (cart === "") {
    if (cart_temp === null) {
      cart_temp = [];

      updateCart(cart_temp);
    } else {
      cart_temp = JSON.parse(cart_temp);
      updateCart(cart_temp);
    }
  }
  var total = 0;

  if (cart !== "") {
    for (var i = 0; i < cart.length; i++) {
      total += parseFloat(cart[i].price);
    }
  }
  var cart_products_render = "";
  if (cart !== "") {
    cart_products_render = cart.map((item) => (
      <div>
        <Box sx={{ flexGrow: 1 }} className="cart_products_row">
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <img src={item.image} className="cart_item_img" />
            </Grid>
            <Grid item xs={4}>
              {item.name}
              <br />
              <span className="category_label">
                {item.category}/{item.sub_category}
              </span>
            </Grid>
            <Grid item xs={5}>
              <span className="cart_item_name">${item.price}</span>
            </Grid>
            <Grid item xs={1}>
              <img
                src="https://img.icons8.com/ios-glyphs/50/000000/filled-trash.png"
                className="icon_cart_delete"
                onClick={() => {
                  cart_temp = cart.filter((element) => element !== item);
                  updateCart(cart_temp);
                  localStorage.setItem("cart", JSON.stringify(cart_temp));
                  update_random(Math.random());
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />
      </div>
    ));
  }
  return (
    <div>
      <Nav />
      <div className="cart_container">
        <div className="your_cart_text">Your Cart</div>
        <Box sx={{ flexGrow: 1 }} className="cart_main_container">
          <Grid container spacing={2}>
            <Grid item sm={9} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs="6">
                  <span className="cart_th_text">
                    &nbsp;&nbsp;&nbsp;Product
                  </span>
                </Grid>
                <Grid item xs="5">
                  <span className="cart_th_text">Price</span>
                </Grid>
              </Grid>
              <hr />
              {cart_products_render}
            </Grid>
            <Grid item sm={3} xs={12} className="cart_calcs_container">
              <div className="cart_calcs_bg">
                <span className="cart_calcs_title_text">Order Summary</span>
                <hr />
                <span className="cart_calcs_cat">Subtotal :</span>
                <span className="cart_calcs_val">${total}</span>
                <br />
                <br />
                <span className="cart_calcs_cat">Shipping :</span>
                <span className="cart_calcs_val">$10</span> <br />
                <br />
                <div className="cart_calcs_total">
                  {" "}
                  <span className="cart_calcs_cat">Total :</span>
                  <span className="cart_calcs_val">${total + 10}</span>{" "}
                </div>
              </div>
              <button className="cart_checkout">CHECKOUT</button>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </div>
  );
};
export default Cart;
