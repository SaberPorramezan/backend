const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const UserService = require("../../services/user.service");

class UserController extends Controller {
  getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userProfile = await UserService.getUserProfile(userId);

    this.sendSuccessResponse(res, HttpStatus.OK, userProfile);
  });
}

module.exports = new UserController();
