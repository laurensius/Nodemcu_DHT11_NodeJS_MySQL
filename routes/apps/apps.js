const express = require("express");
const path = require("path");

const router = express.Router();

//@route    GET /
//desc      Menampilkan monitoring
//@access   Public
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../view/monitoring.html"));
});

//@route    GET /grafik
//desc      Menampilkan grafik
//@access   Public
router.get("/grafik", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../view/grafik.html"));
});

module.exports = router;
