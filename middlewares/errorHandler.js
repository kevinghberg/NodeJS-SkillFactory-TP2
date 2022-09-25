  const errorParser = (error, req, res, next) => {
    if (error.status === 404) {
      
      res.status(404).send("NOT FOUND (404)");
    } else if (error.status === 409) {
      res.status(409).send({
        ok: false,
        msg: "CONFLICT ERROR 409",
      });
    } else if (error.status === 401) {
      res.status(409).send({
        ok: false,
        msg: "- Unauthorized (401) - ",
      });
    } else if (error.status === 500) {
      res.status(500).send("- Server Error -");
    } else if (error.type === "notNull Violation") {
      res.status(400).send("- Conflict (409) - ");
    } else {
      error.status === 500;
    }
  };

const errorHandler = {
    errorParser
}

module.exports = errorHandler;