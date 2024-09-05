const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const { hashPassword } = require("../../utils/bcrypt.utils");
const messages = require("../../configs/messages");

class AuthService {
  static async register(userData) {
    const { email, password } = userData;

    await this.isUserExists(email);
    const user = await UserModel.create({
      ...userData,
      password: await hashPassword(password),
    });

    return user;
  }

  // Utility Methods
  static async isUserExists(email) {
    const isUserExists = await UserModel.exists({ email });
    if (isUserExists)
      throw createHttpError.Conflict(messages.errors.auth.userExists);

    return isUserExists;
  }
  static async findUserById(userId) {
    const user = await UserModel.findById(userId);
    if (!user)
      throw createHttpError.NotFound(messages.errors.auth.userNotFound);

    return user;
  }
  static async findUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    if (!user)
      throw createHttpError.NotFound(messages.errors.auth.userNotFound);

    return user;
  }
  static async validatePassword(enteredPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);

    return isMatch;
  }
}

module.exports = AuthService;
