const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");
const keys = require("../configs/keys");
const messages = require("../configs/messages");

async function generateJwtToken(user, expiresIn, secret) {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user._id,
    };

    const options = {
      expiresIn,
    };

    JWT.sign(payload, secret || keys.jwt.secret, options, (err, token) => {
      if (err)
        reject(
          createHttpError.InternalServerError(
            messages.errors.general.serverError
          )
        );
      resolve(token);
    });
  });
}
async function setAccessToken(res, user) {
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: keys.app.nodeEnv === "development" ? false : true,
    domain: keys.app.nodeEnv === "development" ? "localhost" : keys.app.domain,
  };
  res.cookie(
    "accessToken",
    await generateJwtToken(user, "7d", keys.jwt.accessSecret),
    cookieOptions
  );
}
async function setRefreshToken(res, user) {
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: keys.app.nodeEnv === "development" ? false : true,
    domain: keys.app.nodeEnv === "development" ? "localhost" : keys.app.domain,
  };
  res.cookie(
    "refreshToken",
    await generateJwtToken(user, "1y", keys.jwt.refreshSecret),
    cookieOptions
  );
}

module.exports = {
  setAccessToken,
  setRefreshToken,
};
