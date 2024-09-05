const express = require("express");
const helmet = require("helmet");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const connectToDB = require("../configs/db.config");
const passport = require("../configs/passport.config");
const corsMiddleware = require("../configs/cors.config");
const rateLimit = require("../app/http/middlewares/rateLimit.middleware");
const {
  errorHandler,
  notFoundHandler,
} = require("../app/http/middlewares/errorHandler.middleware");
const { swaggerDocs, swaggerUi } = require("../configs/swagger.config");
const { allRoutes } = require("./routes");
const keys = require("../configs/keys");

class Application {
  #app = express();
  #PORT = keys.app.port;

  constructor() {
    this.createServer();
    this.connectToDB();
    this.configServer();
    this.initClientSession();
    this.configRateLimiter();
    this.configRoutes();
    this.configSwagger();
    this.errorHandling();
  }
  createServer() {
    const server = http.createServer(this.#app);
    server.timeout = 300000;
    server.listen(this.#PORT, () =>
      console.log(`Listening on port ${this.#PORT}`)
    );
  }
  async connectToDB() {
    await connectToDB();
  }
  configServer() {
    this.#app.use(helmet());
    this.#app.use(corsMiddleware);
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(passport.initialize());
  }
  initClientSession() {
    this.#app.use(cookieParser(keys.cookieParser.secret));
  }
  configRateLimiter() {
    this.#app.use(rateLimit);
  }
  configRoutes() {
    this.#app.use("/api", allRoutes);
  }
  configSwagger() {
    if (swaggerDocs && swaggerUi)
      this.#app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
  errorHandling() {
    this.#app.use(notFoundHandler);
    this.#app.use(errorHandler);
  }
}

module.exports = Application;
