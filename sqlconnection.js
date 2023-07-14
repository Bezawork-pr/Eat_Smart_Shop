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

module.exports = connection;
