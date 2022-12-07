import Nav from "./Nav";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = (props) => {
  const [name, update_name] = useState("");
  const [image, update_image] = useState("");
  const [price, update_price] = useState();
  const [category, update_category] = useState("");
  const [sub_category, update_sub_category] = useState("");
  const categories = ["Men", "Women", "Kids", "Accessories"];
  const sub_categories = [
    "T-Shirt",
    "Shorts",
    "Trousers",
    "Sweatshirt",
    "Shoes",
    "Cap",
    "Bag",
  ];

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const categories_render = categories.map((cat) => (
    <MenuItem value={cat}>{cat}</MenuItem>
  ));
  const sub_categories_render = sub_categories.map((cat) => (
    <MenuItem value={cat}>{cat}</MenuItem>
  ));

  function add_product() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        image: image,
        price: price,
        category: category,
        sub_category: sub_category,
      }),
    };
    fetch("https://riwaj-nike-store.herokuapp.com/add_product", requestOptions).then(() => {
      console.log("done");
      showModal();
    });
  }
  return (
    <div>
      {localStorage.getItem("passcode") === "1234" ? (
        <div>
          <Nav />
          <Paper elevation={8} className="add_product_container">
            <Link to="/admin">
              <button className="add_product_back">Back</button>
            </Link>
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Product Name"
              variant="standard"
              className="add_product_name"
              value={name}
              onChange={(e) => update_name(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Image Link"
              variant="standard"
              className="add_product_image"
              value={image}
              onChange={(e) => update_image(e.target.value)}
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="standard-basic"
              label="Price ($)"
              variant="standard"
              className="add_product_price"
              type="number"
              value={price}
              onChange={(e) => update_price(e.target.value)}
            />
            <br />
            <br />
            <br />
            <FormControl style={{ width: "45%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={category}
                onChange={(e) => update_category(e.target.value)}
              >
                {categories_render}
              </Select>
            </FormControl>
            &nbsp;&nbsp;&nbsp;
            <FormControl style={{ width: "45%" }}>
              <InputLabel id="demo-simple-select-label">
                Sub-Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sub-Category"
                value={sub_category}
                onChange={(e) => update_sub_category(e.target.value)}
              >
                {sub_categories_render}
              </Select>
            </FormControl>
            <br />
            <br />
            <br />
            <button
              className="add_product_submit_btn"
              onClick={() => add_product()}
            >
              Add
            </button>
          </Paper>

          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Product Successfully Added !</Modal.Body>
            <Modal.Footer>
              <Link to="/admin">
                {" "}
                <button className="product_added_ok_btn">Ok</button>
              </Link>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default AddProduct;
