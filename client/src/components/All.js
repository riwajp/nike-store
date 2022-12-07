import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const All = (props) => {
  const [loading, update_loading] = useState(true);
  const [category, updateCategory] = useState("All");
  const [products, updateProducts] = useState([]);

  if (products.length === 0) {
    fetch("https://riwaj-nike-store.herokuapp.com/get_all_products")
      .then((data) => data.json())
      .then((data) => {
        updateProducts(data);
        update_loading(false);
        category_changer("All");
        console.log(data[0]);
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

  const products_render = category_changer(category).map((item) => (
    <Grid item md={6} md={4} lg={3} xl={3} className="all_products_product">
      <a>
        <Link to={"/product/" + item._id}>
          <img src={item.image} className="all_products_product_image" />
          <br />
          <span className="category_label">
            {item.category} / {item.sub_category}
          </span>
          <br />
          {item.name}
          <br />${item.price}
        </Link>
      </a>
    </Grid>
  ));

  return (
    <div className="all_container">
      <div classNAme="all_nav">
        {loading === false ? categories_render : ""}
      </div>
      <Box sx={{ flexGrow: 1 }} className="all_products">
        <Grid container spacing={0}>
          {loading === false ? (
            products_render
          ) : (
            <div style={{ width: "100%" }}>
              <center>
                <CircularProgress />
              </center>
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
};
export default All;
