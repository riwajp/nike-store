import Nav from "./Nav";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Admin = (props) => {
  const [products, updateProducts] = useState(props.products);
  const [category, updateCategory] = useState("All");
  const [edit_mode, update_edit_mode] = useState(false);
  const [edit_name, update_edit_name] = useState("");
  const [edit_price, update_edit_price] = useState("");
  const [edit_category, update_edit_category] = useState("");
  const [delete_dict, update_delete_dict] = useState(false);
  const [edit_sub_category, update_edit_sub_category] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, update_passcode] = useState(
    localStorage.getItem("passcode")
  );

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  if (products.length === 0) {
    fetch("https://riwaj-nike-store.herokuapp.com/get_all_products")
      .then((data) => data.json())
      .then((data) => {
        updateProducts(data);
      });
  }

  const categories = ["All", "Men", "Women", "Kids", "Accessories"];

  function category_changer(cat) {
    if (cat === "All") {
      return products;
    } else {
      return products.filter((product) => product.category === category);
    }
  }
  const categories_render = categories.map((cat) => (
    <span className="all_nav_element">
      <a onClick={() => updateCategory(cat)}>
        {category === cat ? (
          <font color="black" style={{ fontWeight: 500 }}>
            {cat}
          </font>
        ) : (
          cat
        )}
      </a>
    </span>
  ));

  function edit_save(product) {
    const i = products.indexOf(product);
    var product_temp = products[i];
    product_temp["name"] = edit_name;
    product_temp["image"] = product.image;
    product_temp["price"] = edit_price;
    product_temp["category"] = edit_category;
    product_temp["sub_category"] = edit_sub_category;
    var products_temp = products;
    products[i] = product_temp;
    updateProducts(products);
    update_edit_mode(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: edit_mode,
        name: edit_name,
        price: edit_price,
        category: edit_category,
        sub_category: edit_sub_category,
      }),
    };
    fetch(
      "https://riwaj-nike-store.herokuapp.com/edit_product",
      requestOptions
    ).then(() => console.log("done"));
  }

  function delete_product(product) {
    var products_temp = products.filter((item) => item !== product);
    updateProducts(products_temp);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: delete_dict._id,
      }),
    };
    fetch(
      "https://riwaj-nike-store.herokuapp.com/delete_product",
      requestOptions
    ).then(() => console.log("done"));
  }

  const products_render = category_changer(category).map((product) => (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={4} className="admin_product_row">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {edit_mode === product._id ? (
              <input
                value={edit_name}
                onChange={(e) => update_edit_name(e.target.value)}
                className="admin_name_edit"
              />
            ) : (
              product.name
            )}
          </Grid>
          <Grid item xs={2}>
            <img src={product.image} className="admin_product_image" />
          </Grid>
          <Grid item xs={1}>
            {edit_mode === product._id ? (
              <input
                type="number"
                value={edit_price}
                onChange={(e) => update_edit_price(e.target.value)}
                className="admin_name_edit"
              />
            ) : (
              "$" + product.price
            )}
          </Grid>
          <Grid item xs={2}>
            {edit_mode === product._id ? (
              <input
                value={edit_category}
                onChange={(e) => update_edit_category(e.target.value)}
                className="admin_name_edit"
              />
            ) : (
              product.category
            )}
          </Grid>
          <Grid item xs={2}>
            {edit_mode === product._id ? (
              <input
                value={edit_sub_category}
                onChange={(e) => update_edit_sub_category(e.target.value)}
                className="admin_name_edit"
              />
            ) : (
              product.sub_category
            )}
          </Grid>
          <Grid item xs={2}>
            {edit_mode === product._id ? (
              <span>
                <button
                  className="admin_edit_save"
                  onClick={() => edit_save(product)}
                >
                  Save
                </button>
                <button
                  className="admin_edit_cancel"
                  onClick={() => update_edit_mode(false)}
                >
                  Cancel
                </button>
              </span>
            ) : (
              <div>
                <button
                  className="admin_edit"
                  onClick={() => {
                    update_edit_mode(product._id);
                    update_edit_name(product.name);
                    update_edit_price(product.price);
                    update_edit_category(product.category);
                    update_edit_sub_category(product.sub_category);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    showModal();
                    update_delete_dict(product);
                  }}
                  className="admin_delete"
                >
                  Delete
                </button>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  ));

  return (
    <div>
      {passcode === "1234" ? (
        <div>
          <Nav />
          <div className="admin_products_div">
            <span className="admin_products_text">Products</span>
            <Link to="/add_product">
              <button className="admin_add_product_btn"> Add Product</button>
            </Link>
            <Link to="/customize">
              <button className="admin_customize_btn"> Customize</button>
            </Link>{" "}
            <br />
            <br />
            {categories_render}
            <br />
            <Box sx={{ flexGrow: 1 }}>
              <div elevation={4} className="admin_product_head">
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    Name
                  </Grid>
                  <Grid item xs={2}>
                    Image
                  </Grid>
                  <Grid item xs={1}>
                    Price{" "}
                  </Grid>
                  <Grid item xs={2}>
                    Category
                  </Grid>
                  <Grid item xs={2}>
                    Sub-Category
                  </Grid>
                  <Grid item xs={2}>
                    Actions
                  </Grid>
                </Grid>
              </div>
            </Box>
            {products_render}
          </div>
          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Delete product id{" "}
              {delete_dict == false ? (
                ""
              ) : (
                <div>
                  <i>{delete_dict._id}</i>({delete_dict.name}) ?
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={hideModal} className="admin_edit">
                Cancel
              </button>
              <button
                className="admin_delete"
                onClick={() => {
                  delete_product(delete_dict);
                  hideModal();
                }}
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div>
          <Nav />
          <Paper elevation={4} className="admin_login_container">
            <div className="admin_login_title">Admin Login</div>
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Enter Passcode"
              variant="standard"
              className="admin_login_input"
              value={passcode}
              onChange={(e) => {
                update_passcode(e.target.value);
                localStorage.setItem("passcode", e.target.value);
              }}
              type="password"
            />
          </Paper>
        </div>
      )}
    </div>
  );
};
export default Admin;
