const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const keys = require("../configs/keys");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation for my project",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Your Name",
      url: "https://yourwebsite.com",
      email: "youremail@domain.com",
    },
  },
  servers: [
    {
      url: `${keys.app.serverURL}/api`,
      description: "Development server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./app/routes/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

if (keys.app.nodeEnv === "development") {
  module.exports = { swaggerDocs, swaggerUi };
} else {
  module.exports = {};
}
