const expressAsyncHandler = require("express-async-handler");
const UserController = require("../http/controllers/user.controller");

const router = require("express").Router();

router.get("/profile", expressAsyncHandler(UserController.getUserProfile));

module.exports = {
  userRoutes: router,
};
