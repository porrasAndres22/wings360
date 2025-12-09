const detect = require("detect-port").detect;
const exec = require("child_process").exec;
require("dotenv").config();


(() => {
  if (process.env.HOST != undefined) {
    const intervalID = setInterval(async () => {
      if (
        !((await detect(process.env.PORT)) ==
        (typeof process.env.PORT == "string"
          ? parseInt(process.env.PORT)
          : process.env.PORT)
          ? true
          : false)
      ) {
        exec(`start ${process.env.HOST}:${process.env.PORT}`);
        clearInterval(intervalID);
      }
    }, 1500);
  }
})();
