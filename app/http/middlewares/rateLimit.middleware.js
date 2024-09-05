const { StatusCodes: HttpStatus } = require("http-status-codes");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: {
    message: "Too many requests from this IP, please try again after 1 minute.",
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
  },
  headers: true,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
