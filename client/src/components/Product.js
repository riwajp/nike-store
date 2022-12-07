import Nav from "./Nav";
import { useParams } from "react-router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

const Product = (props) => {
  const [edit_sub_category, update_edit_sub_category] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  var cart = localStorage.getItem("cart");

  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  const id = useParams().product_id;
  const [size, updateSize] = useState("L");
  const [product, updateProduct] = useState(null);
  if (product === null) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    };
    fetch(
      "https://riwaj-nike-store.herokuapp.com/get_product_by_id",
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        updateProduct(data[0]);
      });
  }

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const sizes_render = sizes.map((size_t) => (
    <button
      className="size"
      style={{
        borderColor: size === size_t ? "black" : "grey",
        borderWidth: size === size_t ? 2 : 1,
      }}
      onClick={() => updateSize(size_t)}
    >
      {size_t}
    </button>
  ));

  return (
    <div>
      <Nav />
      <br />

      <Box sx={{ flexGrow: 1 }} className="product_page_main">
        {product === null ? (
          <div style={{ width: "100%", marginTop: "20%" }}>
            <center>
              <CircularProgress />
            </center>
          </div>
        ) : (
          <div>
            <Grid container spacing={2}>
              <Grid item sm={7} xs={12} className="product_page__img_container">
                <img src={product.image} className="product_page__img" />
              </Grid>

              <Grid item sm={5} xs={12}>
                <Paper elevation={0} className="product_page_details_container">
                  <span className="product_page_name">{product.name}</span>
                  <br />
                  <span className="category_label">
                    {product.category} / {product.sub_category}{" "}
                  </span>
                  <br />
                  <br />
                  <span className="product_page_price">${product.price}</span>
                  <br />
                  <br />
                  <span className="select_size_text">Select Size</span>
                  <br />
                  <br />
                  <div className="sizes">{sizes_render}</div>
                  <br />
                  <br />

                  <button
                    className="add_to_cart"
                    onClick={() => {
                      cart.push(product);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      showModal();
                    }}
                  >
                    ADD TO CART
                  </button>

                  <button className="buy_now">BUY NOW</button>
                </Paper>
              </Grid>
            </Grid>
            <br />
            <br />
            <Footer />
          </div>
        )}
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {product !== null ? product.name : ""} added to Cart.
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => hideModal()}
              className="product_added_ok_btn"
            >
              Ok
            </button>
          </Modal.Footer>
        </Modal>
      </Box>
    </div>
  );
};

export default Product;
