const express = require("express");
const bodyParser = require("body-parser");

const homePage = require("./routes/home");
const signInRouter = require("./routes/users");
const PATH = require("path");
const app = express();

const PORT = 3000;


app.use(express.static("public"));
app.set("views", "public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", homePage);
app.use("/user", signInRouter);

app.listen(PORT);
