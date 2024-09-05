const passport = require("passport");

const verifyLocal = passport.authenticate("local", {
  session: false,
});
const verifyAccessToken = passport.authenticate("jwt-access", {
  session: false,
});
const verifyRefreshToken = passport.authenticate("jwt-refresh", {
  session: false,
});

module.exports = {
  verifyLocal,
  verifyAccessToken,
  verifyRefreshToken,
};
