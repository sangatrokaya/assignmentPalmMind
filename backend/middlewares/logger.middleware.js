import colors from "colors";
import fs from "fs";
import path from "path";
import url from "url";

function logger(req, res, next) {
  let __filename = url.fileURLToPath(import.meta.url);
  let __dirname = path.dirname(__filename);
  let reqColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };
  let today = new Date();
  let start = Date.now();
  let formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()} | Time ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  res.on("finish", () => {
    let end = Date.now();
    let logMsg = `[${formattedDate}] :: ${req.method} | ${req.originalUrl} | ${
      req.ip
    } ${res.statusCode} | ${end - start}ms`;
    console.log(logMsg[reqColors[req.method]]);

    fs.appendFile(path.join(__dirname, "../app.log"), logMsg + "\n", (err) => {
      if (err) console.log(err.message);
    });
  });
  next();
}

export default logger;
