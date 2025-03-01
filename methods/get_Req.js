module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/").pop();
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "validation falied",
        message: "id is not Valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && id) {
    res.setHeader("Content-Type", "application/json");
    let filtered_movie = req.movies.filter((movie) => {
      return movie.id === id;
    });
    if (filtered_movie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filtered_movie));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "movie not found" })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not Found", message: "Routing Not Found" })
    );
  }
};
