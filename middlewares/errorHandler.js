const notFound = (req, res, next) => {
    const err = new Error("Pagina no encontrada");
    err.status = 404;
    return next(err); 
  }

const errorHandler = {
    notFound
}

module.exports = errorHandler;