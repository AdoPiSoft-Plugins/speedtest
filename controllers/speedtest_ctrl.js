'use strict'

var core = require('../../core')
var path = require("path")
var { admin_socket } = core
var { spawn } = require('child_process')
var running = false
var e = 'terminal:output'

exports.get = async(req, res, next)=>{
  res.json({
    running,
  })
}

exports.start = async(req, res, next)=>{
  try{
    running = true
    var py_exec_path = path.join(process.env.APPDIR, "plugins", 'speedtest', 'scripts', 'speedtest.py')
    var { stdout, stderr } = spawn('python', [py_exec_path])
    stdout.on('data', d => {
      d = d || ""
      admin_socket.emitAdmin(e, d.toString())
    })

    var onEnd = (d)=>{
      d = d || ""
      running = false
      admin_socket.emitAdmin(`${e}:end`)
      console.log(d.toString())
    }
    stdout.on('close', onEnd)
    stdout.on('end', onEnd)
    stdout.on('exit', onEnd)

    stderr.on('data', (d)=>{
      d = d || ""
      running = false
      admin_socket.emitAdmin(`${e}:error`, d.toString())
    })

    res.json({})
  }catch(e){
    next(e)
  }
}
