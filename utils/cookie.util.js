const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const keys = require("../configs/keys");
const messages = require("../configs/messages");

function extractJwtFromCookies(req, cookieName) {
  try {
    const token = req.signedCookies[cookieName];
    if (!token)
      throw createHttpError.Unauthorized(messages.errors.auth.tokenMissing);

    return cookieParser.signedCookie(token, keys.cookieParser.secret) || null;
  } catch (err) {
    throw createHttpError.Unauthorized(messages.errors.auth.invalidToken);
  }
}
function clearCookies(res) {
  const cookieOptions = {
    maxAge: 1,
    expires: Date.now(),
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: true,
    path: "/",
    domain: keys.app.domain,
  };

  res.cookie("accessToken", null, cookieOptions);
  res.cookie("refreshToken", null, cookieOptions);
}

module.exports = {
  extractJwtFromCookies,
  clearCookies,
};
