const http = require("http");
require("dotenv").config();

const getReq = require("./methods/get_Req");
const putReq = require("./methods/put_Req");
const postReq = require("./methods/post_Req");
const delReq = require("./methods/del_Req");

let movies = require("./data/movies.json");

const PORT = process.env.PORT || 5001;
const Server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      delReq(req, res);
      break;
    default:
      res.statusCode = 200;
      res.setHeader("Content-Header", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Routing Not Found" })
      );
      res.end();
  }
});
Server.listen(PORT, () => {
  console.log("Server started on port :", PORT);
});
