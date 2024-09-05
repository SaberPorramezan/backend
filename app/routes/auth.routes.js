const expressAsyncHandler = require("express-async-handler");
const AuthController = require("../http/controllers/auth.controller");
const validate = require("../http/middlewares/validation.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../http/validators/auth.schema");
const {
  verifyLocal,
  verifyRefreshToken,
} = require("../http/middlewares/auth.middleware");

const router = require("express").Router();

router.get(
  "/refresh-token",
  verifyRefreshToken,
  expressAsyncHandler(AuthController.refreshToken)
);
router.post(
  "/register",
  validate(registerSchema),
  expressAsyncHandler(AuthController.register)
);
router.post(
  "/login",
  validate(loginSchema),
  verifyLocal,
  expressAsyncHandler(AuthController.login)
);
router.post("/logout", expressAsyncHandler(AuthController.logout));

module.exports = {
  authRoutes: router,
};
