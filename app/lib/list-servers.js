const path = require("path");
const py_exec_path = path.join(__dirname + "/../../", "scripts", "speedtest.py");
const {
  spawn
} = require("child_process");
module.exports = async() => {
  return new Promise((resolve, reject) => {
    let result;
    const args = [py_exec_path, "--list"];
    const {
      stdout
    } = spawn("python3", args);
    stdout.on("data", d => {
      d = d || "";
      result += d.toString()
    });

    function formatResult(r) {
      let fresult = [];
      for (let s of r.split("\n")) {
        try {
          let id = s.match(/(\d+)\)/i)[1];
          let name = s.replace(id + ")", "").trim();
          fresult.push({
            id: id,
            name: name
          })
        } catch (e) {}
      }
      return fresult
    }

    function onDone(d) {
      resolve(formatResult(result))
    }
    stdout.on("close", onDone);
    stdout.on("end", onDone);
    stdout.on("exit", onDone)
  })
};