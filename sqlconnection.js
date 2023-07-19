const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "Eat_Smart_Shop",
});

//connection.connect((err) => {
//  if (err) {
//    setTimeout(connection, "1000");
//    console.log(err);
//    return;
//  }
//  console.log("Database Connected");
//});
connection.on("connection", function (connection) {
  console.log("Connection established");
  connection.on("error", function (err) {
    console.error(new Date(), "My SQL error", err.code);
  });
  connection.on("close", function (err) {
    console.log(new Date(), "My SQL close", err);
  });
});
module.exports = connection;
