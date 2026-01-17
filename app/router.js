"use strict"

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const speedtest_ctrl = require("./controllers/speedtest_ctrl.js");

router.get("/speedtest-plugin", speedtest_ctrl.get);
router.post("/speedtest-plugin/start", express.urlencoded({
  extended: true
}), bodyParser.json(), speedtest_ctrl.start);

module.exports = router;