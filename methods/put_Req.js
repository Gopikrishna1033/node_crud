const requestBodyParser = require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");

module.exports = async (req, res) => {
  let baseurl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseurl);

  let id = req.url.split("/").filter(Boolean).pop(); // Ensure valid id extraction
  console.log(id, "id");

  if (!id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "match not found",
        message: "id doesn't exist",
      })
    );
    return;
  }

  if (baseurl === "/api/movies/" && id) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie) => movie.id == id); // Ensure type matching

      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ title: "Not Found", message: "Movie Not Found" })
        );
        return;
      }

      req.movies[index] = { id, ...body };
      writeToFile(req.movies);

      res.writeHead(200, { "Content-Type": "application/json" }); // Fixed typo
      res.end(JSON.stringify(req.movies[index])); // Fixed incorrect `JSON > stringify`
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "id is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not Found", message: "Routing Not Found" })
    );
  }
};
