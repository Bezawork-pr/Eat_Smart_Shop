const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Eat_Smart_Shop",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database Connected");
});
try {
  const order =
    "INSERT INTO Orders (OrderId, HowManyOrdered, ProductId, OrderReceipt) VALUES(1, 1, 1, 1);";
  connection.query(order, (err, result) => {
    console.log("Order added");
  });
} catch (err) {
  console.log(err);
}
const app = express();
const PORT = 5000;
let currentUserFirstName = "Unknown";
let currentUserLastName = "UnKnown";
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//   console.log("Connected");
//   res.locals.connection = createConnection;
//   console.log("Disconnected");
//   next();
// });
app.get("/", (req, res) => {
  connection.query("SELECT * FROM Product", (err, result) => {
    res.render("pages/index", { result: result });
  });
});

app.get("/registration", (req, res) => {
  res.render("pages/registration");
});
app.post("/registration", (req, res) => {
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  const PersonId = 1;
  connection.query(
    "INSERT INTO User (PersonId, FirstName, LastName, OrderId) VALUES (1, ?, ?, 1) ",
    [firstName, lastName],
    (err, result) => {
      if (err) throw err;
      console.log("Registered");
    }
  );
  res.render("pages/registration");
});
app.get("/login", (req, res) => {
  res.render("pages/login");
});
app.post("/login", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  let currentUserFirstName = firstName;
  let currentUserLastName = lastName;
  let result = 1;
  connection.query("SELECT * FROM Product", (err, res) => {
    result = res;
  });
  connection.query("SELECT * FROM User", (err, Userresult) => {
    for (let i in Userresult) {
      if (
        Userresult[i].FirstName === firstName &&
        Userresult[i].LastName === lastName
      ) {
        res.render("pages/logged", {
          result: result,
          firstName: firstName,
          lastName: lastName,
        });
      }
    }
  });
});
app.get("/buy", (req, res) => {
  let result = 1;
  connection.query("SELECT * FROM Product", (err, res) => {
    result = res;
  });
  connection.query("SELECT * FROM User", (err, Userresult) => {
    for (let i in Userresult) {
      if (
        Userresult[i].FirstName === currentUserFirstName &&
        Userresult[i].LastName === currentUserLastName
      ) {
        res.render("pages/buy", {
          result: result,
          firstName: currentUserFirstName,
          lastName: currentUserLastName,
        });
      }
    }
    res.render("pages/buy", {
      result: result,
      firstName: currentUserFirstName,
      lastName: currentUserLastName,
    });
  });
});
app.post("/buy", (req, res) => {
  let products = 1
  connection.query("SELECT * FROM Product", (err, res) => {
    result = res;
  });
  for (let i in result) {
    
  }
  const updateProductQuery = "UPDATE Orders set"
});

app.listen(PORT);
