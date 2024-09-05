const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const keys = require("../../../configs/keys");
const messages = require("../../../configs/messages");

// Middleware for handling errors
function errorHandler(err, req, res, next) {
  // Default to 500 Internal Server Error
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = messages.errors.general.internalServerError;

  // Check if it's a mongoose validation error
  if (err.name === "ValidationError") {
    message = messages.errors.general.badRequest;
    statusCode = HttpStatus.BAD_REQUEST;
  }

  // Check if it's a duplicate key error
  if (err.code && err.code === 11000) {
    message = messages.errors.general.conflict;
    statusCode = HttpStatus.CONFLICT;
  }

  // Check if it's an error created by createHttpError
  if (err instanceof createHttpError.HttpError) {
    message = err.message || message;
    statusCode = err.statusCode || statusCode;
  }

  // Additional error types can be checked here

  // Log the error for debugging
  if (keys.app.nodeEnv === "development") {
    console.error(err);
  }

  res.status(statusCode).json({
    message,
    statusCode,
    ...(keys.app.nodeEnv === "development" && { stack: err.stack }),
  });
}

// Middleware for handling 404 errors
function notFoundHandler(req, res, next) {
  next(createHttpError.NotFound(messages.errors.general.notFound));
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
