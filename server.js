const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api/api");
const apps = require("./routes/apps/apps");

var app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use route
app.use(express.static(__dirname));
app.use("/", apps);
app.use("/api", api);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server runing on port " + port));
