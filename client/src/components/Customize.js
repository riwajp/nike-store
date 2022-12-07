import Nav from "./Nav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const Customize = () => {
  const [products, updateProducts] = useState([]);
  if (products.length === 0) {
    fetch("https://riwaj-nike-store.herokuapp.com/get_all_products")
      .then((data) => data.json())
      .then((data) => {
        updateProducts(data);
      });
  }

  const [mp1, update_mp1] = useState("");
  const [mp2, update_mp2] = useState("");
  const [mp3, update_mp3] = useState("");

  const products_select_render = products.map((item) => (
    <MenuItem value={item._id}>{item.name}</MenuItem>
  ));

  function save() {
    console.log(mp1);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mp1: mp1,
        mp2: mp2,
        mp3: mp3,
      }),
    };
    fetch(
      "https://riwaj-nike-store.herokuapp.com/customize",
      requestOptions
    ).then(() => window.alert("Saved"));
  }
  return (
    <div>
      {localStorage.getItem("passcode") === "1234" ? (
        <div>
          <Nav />
          <div className="admin_products_div">
            <span className="admin_products_text">Customize</span>
            <hr />
            <br />
            <Box sx={{ flexGrow: 1 }} className="all_products">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Featured Product 1
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Featured Product 1"
                      value={mp1}
                      onChange={(e) => update_mp1(e.target.value)}
                    >
                      {products_select_render}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      Featured Product 2
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Featured Product 2"
                      value={mp2}
                      onChange={(e) => update_mp2(e.target.value)}
                    >
                      {products_select_render}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      Featured Product 3
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Featured Product 3"
                      value={mp3}
                      onChange={(e) => update_mp3(e.target.value)}
                    >
                      {products_select_render}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <button className="add_to_cart" onClick={() => save()}>
              Save
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Customize;
