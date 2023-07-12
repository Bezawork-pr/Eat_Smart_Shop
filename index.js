const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const mysql = require("mysql");
mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Eat_Smart_Shop",
});
const app = express();
const PORT = 5000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => res.render("pages/index"));
app.listen(PORT);
