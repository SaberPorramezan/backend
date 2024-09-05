const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const AuthService = require("../../services/auth.service");
const { clearCookies } = require("../../../utils/cookie.util");
const {
  setAccessToken,
  setRefreshToken,
} = require("../../../utils/token.util");
const messages = require("../../../configs/messages");

class AuthController extends Controller {
  refreshToken = asyncHandler(async (req, res) => {
    const { user } = req;

    await setAccessToken(res, user);
    await setRefreshToken(res, user);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      user,
      message: messages.success.auth.tokenRefreshed,
    });
  });
  register = asyncHandler(async (req, res) => {
    const userData = req.body;

    const user = await AuthService.register(userData);

    await setAccessToken(res, user);
    await setRefreshToken(res, user);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      user,
      message: messages.success.auth.register,
    });
  });
  login = asyncHandler(async (req, res) => {
    const { user } = req;

    await setAccessToken(res, user);
    await setRefreshToken(res, user);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      user,
      message: messages.success.auth.login,
    });
  });
  logout = asyncHandler(async (req, res) => {
    clearCookies(res);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.auth.logout,
    });
  });
}

module.exports = new AuthController();
