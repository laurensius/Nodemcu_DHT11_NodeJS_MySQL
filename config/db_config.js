const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "laurens23",
  database: "nodejs_iot"
});

db.connect();

module.exports = db;
