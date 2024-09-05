const createHttpError = require("http-errors");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
      return next(createHttpError.BadRequest(error.details[0].message));

    next();
  };
}

module.exports = validate;
