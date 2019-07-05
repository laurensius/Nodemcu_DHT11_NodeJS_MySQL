const express = require("express");

const db = require("../../config/db_config");
const router = express.Router();

//@route    GET api/save_data
//desc      Proses save data dari sensor ke database mysql
//@access   Public
router.get("/save_data", (req, res) => {
  if (
    req.query.suhu_1 == null &&
    req.query.kelembaban_1 == null &&
    req.query.suhu_2 == null &&
    req.query.kelembaban_2 == null
  ) {
    res.json({
      severity: "warning",
      message: "Tidak ada data sensor dikirim ke Server",
      content: null
    });
  } else {
    let sql =
      "INSERT INTO pengukuran (suhu_1, kelembaban_1, suhu_2, kelembaban_2, datetime) VALUES ?";
    var dateTime = require("node-datetime");
    var dt = dateTime.create();
    var formatted = dt.format("Y-m-d H:M:S");
    var values = [
      [
        req.query.suhu_1,
        req.query.kelembaban_1,
        req.query.suhu_2,
        req.query.kelembaban_2,
        formatted
      ]
    ];
    db.query(sql, [values], function(err, result) {
      if (err) {
        res.json({
          severity: "warning",
          message:
            "Tidak dapat menyimpan data ke database server " + err.message,
          content: null
        });
      } else {
        res.json({
          severity: "success",
          message:
            result.affectedRows + " Data berhasil disimpan ke database server",
          content: null
        });
      }
    });
  }
});

//@route    GET api/recent
//desc      Proses save data dari sensor ke database mysql
//@access   Public
router.get("/recent", (req, res) => {
  let sql = "SELECT * FROM pengukuran order by id desc limit 1";
  db.query(sql, function(err, result) {
    if (err) {
      res.json({
        severity: "warning",
        message: "Tidak dapat mengambil data dari database " + err.message,
        content: null
      });
    } else {
      res.json({
        severity: "success",
        message: result.length + " Data berhasil diambil dari database server",
        content: { sensor: result }
      });
    }
  });
});

//@route    GET api/recent
//desc      Proses save data dari sensor ke database mysql
//@access   Public
router.get("/grafik", (req, res) => {
  let sql = "SELECT * FROM pengukuran order by id desc limit 25";
  db.query(sql, function(err, result) {
    if (err) {
      res.json({
        severity: "warning",
        message: "Tidak dapat mengambil data dari database " + err.message,
        content: null
      });
    } else {
      res.json({
        severity: "success",
        message: result.length + " Data berhasil diambil dari database server",
        content: { sensor: result }
      });
    }
  });
});

module.exports = router;
