"use strict";
const {
  promisify
} = require("util");
const path = require("path");
const listServers = require("../lib/list-servers.js");
const socket_factory = require('@adopisoft/core/utils/socket-factory.js')
const {
  spawn
} = require("child_process");

const request = require("request");
const httpGet = promisify(request.get);
var running = false;
const e = "terminal:output";
const servers_api_url = "https://www.speedtest.net/api/js/servers?engine=js&limit=50&https_functional=true";
const py_exec_path = path.join(__dirname, "/../../", "scripts", "speedtest.py");


exports.get = async(req, res, next) => {
  var servers = [];
  try {
    servers = await listServers()
  } catch (e) {}
  if (!servers.length) {
    try {
      servers = JSON.parse((await httpGet(servers_api_url)).body)
    } catch (e) {}
  }
  try {
    res.json({
      servers: servers,
      running: running
    })
  } catch (e) {
    next(e)
  }
};
exports.start = async(req, res, next) => {
  var {
    server_id
  } = req.body;
  try {
    running = true;
    var args = [py_exec_path];
    if (server_id) {
      args.push(`--server=${server_id}`)
    }
    var {
      stdout,
      stderr
    } = spawn("python3", args);
    stdout.on("data", d => {
      d = d || "";
      socket_factory.emitAdmin(e, d.toString())
    });
    var onEnd = d => {
      d = d || "";
      running = false;
      socket_factory.emitAdmin(`${e}:end`);
      console.log(d.toString())
    };
    stdout.on("close", onEnd);
    stdout.on("end", onEnd);
    stdout.on("exit", onEnd);
    stderr.on("data", d => {
      d = d || "";
      running = false;
      socket_factory.emitAdmin(`${e}:error`, d.toString())
    });
    res.json({})
  } catch (e) {
    next(e)
  }
};