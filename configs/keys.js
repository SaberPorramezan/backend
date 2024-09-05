const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  app: {
    name: "e-commerce",
    serverURL: `${process.env.SERVER_URL}`,
    clientURL: process.env.CLIENT_URL,
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    corsOrigin: process.env.ALLOW_CORS_ORIGIN,
    domain: process.env.DOMAIN,
  },
  database: {
    uri: process.env.APP_DB,
  },
  cookieParser: {
    secret: process.env.COOKIE_PARSER_SECRET_KEY,
  },
  jwt: {
    secret: process.env.TOKEN_SECRET_KEY,
    accessSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
  },
};
