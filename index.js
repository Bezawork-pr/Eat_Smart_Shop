const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const connection = require("./sqlconnection");

try {
  connection.query("SELECT * FROM CurrentUser", (err, res) => {
    console.log(res);
  });
} catch (err) {}
var currentUserFirstName, currentUserLastName;

// try {
//   const order =
//     "INSERT INTO Orders (OrderId, HowManyOrdered, ProductId, OrderReceipt) VALUES(1, 1, 1, 1);";
//   connection.query(order, (err, result) => {
//     console.log("Order added");
//   });

//   console.log("Order added");
// } catch (err) {
//   console.log(err);
// }

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const query = "SELECT * FROM Product";

  connection.query(query, (err, result) => {
    if (err) throw err;
    res.render("pages/index", { result: result });
  });
});

app.get("/registration", (req, res) => {
  const query = "SELECT * FROM Orders";
  connection.query(query, (err, Orders) => {
    if (err) throw err;
    res.render("pages/registration", { Orders: Orders });
  });
});

app.post("/registration", (req, res) => {
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let PersonId = req.body.PersonId;
  // Update Later
  //connection.query("SELECT COUNT(FirstName) FROM User", (err, res) => {
  //});

  connection.query(
    "INSERT INTO User (PersonId, FirstName, LastName) VALUES (?, ?, ?) ",
    [PersonId, firstName, lastName],
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
  connection.query("DELETE FROM CurrentUser");
  connection.query(
    "INSERT INTO CurrentUser (FirstName, LastName) VALUES (?, ?)",
    [firstName, lastName],
    (err, result) => {
      if (err) throw err;
      console.log("Current User added to DB");
    }
  );
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

app.get("/buy", (req, res, next) => {
  let result = 1;
  connection.query("SELECT * FROM Product", (err, res) => {
    result = res;
  });
  connection.query("SELECT * FROM User", (err, Userresult) => {
    var firstName = "UnKnown";
    var lastName = "UnKnown";
    connection.query("SELECT * FROM CurrentUser", (err, CurrentUser) => {
      try {
        firstName = CurrentUser[0].FirstName;
        lastName = CurrentUser[0].LastName;
        console.log(firstName, lastName);
        res.render("pages/buy", {
          result: result,
          firstName: firstName,
          lastName: lastName,
        });
      } catch (err) {}
    });
  });
});

app.post("/buy", (req, res) => {
  // let myResult;
  // function queryCurrentUser() {
  //   connection.query("SELECT * FROM CurrentUser", (err, result) => {
  //     myResult = result[0].FirstName;
  //   });
  //   return myResult;
  // }
  // global.result = [];
  // global.orders = 1;
  // let orderId = 1;
  // let products = 1;
  // let users = 1;

  // var lastName = "UnKnown";
  //connection.query("SELECT * FROM CurrentUser", (err, result) => {
  // global.firstName = result[0].FirstName;
  //});
  // let firstName = queryCurrentUser();
  // console.log(firstName);
  // console.log("-------");
  // res.send(firstName);
  // connection.query("SELECT * FROM User", (err, resultFromUserTable) => {
  //   if (err) throw err;
  //   users = resultFromUserTable;
  // });

  // connection.query("SELECT * FROM Product", (err, resultFromProductTable) => {
  //   if (err) throw err;
  //   products = resultFromProductTable;
  // });
  // connection.query("SELECT * FROM Orders", (err, resultFromOrdersTable) => {
  //   if (err) throw err;
  //   orders = resultFromOrdersTable;
  // });
  // connection.query("SELECT * FROM CurrentUser", (err, CurrentUser) => {
  //   try {
  //     firstName = CurrentUser[0].FirstName;
  //     lastName = CurrentUser[0].LastName;
  //     console.log(firstName, lastName);
  //   } catch (err) {}
  //   for (let i in users) {
  //     for (let m in orders) {
  //       console.log();
  //       if (orders[m].OrderId === users[i].OrderId) {
  //         for (let j in products) {
  //           if (orders[m].ProductId === products[j].ProductId) {
  //             result.push(products[j]);
  //             console.log(result);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   res.render("pages/order", {
  //     result: result,
  //     firstName: firstName,
  //     lastName: lastName,
  //   });
  // });
  // let result = [];
  // let orders = 1;
  // let orderId = 1;
  // let products = 1;
  // let users = 1;
  // var firstName = "UnKnown";
  // var lastName = "UnKnown";
  // connection.query("SELECT * FROM User", (err, resultFromUserTable) => {
  //   if (err) throw err;
  //   userForPostBuy = resultFromUserTable;
  // });
  const ProductName = req.body.productname;
  const numberOfPurchase = Number.parseInt(req.body.numberofpurchase);
  const OrderId = Number.parseInt(req.body.orderId);
  const orderReceipt = Number.parseInt(req.body.orderReceipt);

  connection.query("SELECT * FROM User", (err, resultFromUserTable) => {
    if (err) throw err;
    userForPostBuy = resultFromUserTable;
  });
  connection.query(
    "SELECT * FROM Product",
    (errorForProduct, resultFromProductTable) => {
      if (errorForProduct) throw errorForProduct;
      for (let p in resultFromProductTable) {
        if (resultFromProductTable[p].ProductName === ProductName) {
          var ProductId = resultFromProductTable[p].ProductId;
        }
      }
      connection.query(
        "SELECT * FROM CurrentUser",
        (err, resultFromCurrentUserTable) => {
          if (err) throw err;
          firstName = resultFromCurrentUserTable[0].FirstName;
          connection.query("SELECT * FROM User", (err, resultFromUserTable) => {
            if (err) throw err;
            for (let i in resultFromUserTable) {
              if (resultFromUserTable[i].FirstName === firstName) {
                const PersonId = resultFromUserTable[i].PersonId;
                connection.query(
                  "INSERT INTO Orders (OrderId, ProductId, PersonId, HowManyOrdered, ProductName, OrderReceipt) VALUES(?, ?, ?, ?, ?, ?)",
                  [
                    OrderId,
                    ProductId,
                    PersonId,
                    numberOfPurchase,
                    ProductName,
                    orderReceipt,
                  ],
                  (errorfromInsert, resultFromInsert) => {
                    if (errorfromInsert) throw errorfromInsert;
                    connection.query(
                      "SELECT * FROM Orders",
                      (errorFromretrieve, resultFromRetrieve) => {
                        let result = [];
                        for (let j in resultFromRetrieve) {
                          if (resultFromRetrieve[j].PersonId === PersonId) {
                            result.push(resultFromRetrieve[j]);
                          }
                        }
                        for (let k in result) {
                          console.log(result[k].OrderId);
                        }
                        res.render("pages/order", {
                          result: result,
                          firstName: firstName,
                        });
                      }
                    );
                  }
                );
              }
            }
          });
        }
      );
    }
  );
  // console.log(products);
  // connection.query("SELECT * FROM Orders", (err, resultFromOrdersTable) => {
  //   if (err) throw err;
  //   orders = resultFromOrdersTable;
  // });
  // connection.query("SELECT * FROM CurrentUser", (err, CurrentUser) => {
  //   try {
  //     firstName = CurrentUser[0].FirstName;
  //     lastName = CurrentUser[0].LastName;
  //     console.log(firstName, lastName);
  //   } catch (err) {}
  //   for (let i in users) {
  //     for (let m in orders) {
  //       console.log();
  //       if (orders[m].OrderId === users[i].OrderId) {
  //         for (let j in products) {
  //           if (orders[m].ProductId === products[j].ProductId) {
  //             result.push(products[j]);
  //             console.log(result);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   res.render("pages/order", {
  //     result: result,
  //     firstName: firstName,
  //     lastName: lastName,
  //   });
  // });
});

app.listen(PORT);
