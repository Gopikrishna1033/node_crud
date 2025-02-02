const writeToFile = require("../utils/write-to-file");

module.exports = (req, res) => {
  let baseurl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/").pop();
  if (!id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "match not found",
        message: "id doesn't exist",
      })
    );
  } else if (baseurl === "/api/movies/" && id) {
    const index = req.movies.findIndex((movie) => {
      return movie.id === id;
    });
    console.log(index, "index");
    if (index === -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movie Not Found" })
      );
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not Found", message: "Routing Not Found" })
    );
  }
};
