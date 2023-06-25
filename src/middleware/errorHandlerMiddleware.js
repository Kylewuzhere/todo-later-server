const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json(err.message);
};

module.exports = errorHandler;
