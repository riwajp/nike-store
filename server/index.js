const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
var router = express.Router();
let bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
require("dotenv").config();

var mongoUrl =
  "mongodb://root:toor@cluster0-shard-00-00.nlajo.mongodb.net:27017,cluster0-shard-00-01.nlajo.mongodb.net:27017,cluster0-shard-00-02.nlajo.mongodb.net:27017/merch?authSource=admin&replicaSet=atlas-6r2yh7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
var mongoose = require("mongoose");
mongoose.connect(mongoUrl);

var db = mongoose.connection;

mongoose.connection.on("error", (err) =>
  console.log(
    "MongoDB connection error:===================================================================== ${err}"
  )
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

var schema;
app.get("/get_all_products", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  mongoose.models = [];
  products_table = mongoose.model("merch1", schema, "products");
  products_table.find().then((data) => {
    res.send(data);
    console.log(data);
  });
});

app.post("/get_product_by_id", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  console.log(req.body.id);
  mongoose.models = [];
  products_table = mongoose.model("merch2", schema, "products");
  products_table.find({ _id: req.body.id }).then((data) => {
    res.send(data);
    console.log(data);
  });
});

app.get("/get_main_products", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  mongoose.models = [];
  products_table = mongoose.model("merch3", schema, "products");
  products_table.find({ main: true }).then((data) => {
    res.send(data);
    console.log(data);
  });
});

app.post("/edit_product", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  mongoose.models = [];
  products_table = mongoose.model("merch2", schema, "products");
  products_table.findOne({ _id: req.body.id }).then((data) => {
    data.name = req.body.name;
    data.price = req.body.price;
    data.category = req.body.category;
    data.sub_category = req.body.sub_category;
    data.save();
  });
});

app.post("/delete_product", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  mongoose.models = [];
  products_table = mongoose.model("merch2", schema, "products");
  products_table.deleteOne({ _id: req.body.id }).then((data) => {});
});

app.post("/add_product", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  mongoose.models = [];
  products_table = mongoose.model("merch2", schema, "products");
  product = products_table(req.body);
  product.save();
  res.send("success");
});

app.post("/customize", (req, res) => {
  schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    sub_category: String,
    main: Boolean,
  });
  mongoose.models = [];
  products_table = mongoose.model("merch3", schema, "products");

  products_table.find({ main: true }).then((data) => {
    for (var i = 0; i < data.length; i++) {
      data_temp = data[i];
      if (
        req.body.mp1 != data_temp._id &&
        req.body.mp2 != data_temp._id &&
        req.body.mp3 != data_temp._id
      ) {
        data_temp.main = false;
        data_temp.save();
        console.log("deleted" + data_temp._id);
      }
      if (i === data.length - 1) {
        do_this();
      }
    }
    if (data.length === 0) {
      do_this();
    }
  });

  function do_this() {
    const mps = ["mp1", "mp2", "mp3"];

    products_table.find({ main: false }).then((data) => {
      for (var i = 0; i < data.length; i++) {
        data_temp = data[i];
        if (
          req.body.mp1 == data_temp._id ||
          req.body.mp2 == data_temp._id ||
          req.body.mp3 == data_temp._id
        ) {
          data_temp.main = true;
          data_temp.save();
          console.log("Added" + data_temp._id);
        }
      }
    });
  }
  res.send("done");
});

var schema;
