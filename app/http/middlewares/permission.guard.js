const createHttpError = require("http-errors");
const expressAsyncHandler = require("express-async-handler");
const { UserModel } = require("../../models/user.model");
const messages = require("../../../configs/messages");

function authorize(...allowedRoles) {
  return expressAsyncHandler(async function (req, res, next) {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (allowedRoles.length === 0 || allowedRoles.includes(user.role))
      return next();

    throw createHttpError.Forbidden(messages.errors.general.forbidden);
  });
}

module.exports = {
  authorize,
};
