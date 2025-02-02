const requestBodyParser = require("../utils/body-parser");
const crypto = require("crypto");
const writToFile = require("../utils/write-to-file");
const { title } = require("process");
module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
      console.log("Request Body :", body);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "validation falied",
          message: "id is not Valid",
        })
      );
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
  }
};
