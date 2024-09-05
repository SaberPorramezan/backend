const autoBind = require("auto-bind");

module.exports = class Controller {
  constructor() {
    autoBind(this);
  }

  sendSuccessResponse(res, statusCode, data) {
    res.status(statusCode).json({
      data,
      statusCode,
    });
  }
  sendErrorResponse(next, error) {
    next(error);
  }
};
