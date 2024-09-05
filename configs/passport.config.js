const passport = require("passport");
const createHttpError = require("http-errors");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const AuthService = require("../app/services/auth.service");
const { UserModel } = require("../app/models/user.model");
const { extractJwtFromCookies } = require("../utils/cookie.util");
const keys = require("./keys");
const messages = require("./messages");

// Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user)
          return done(
            createHttpError.Unauthorized(messages.errors.auth.userNotFound),
            false
          );

        const isValidPassword = await AuthService.validatePassword(
          password,
          user.password
        );
        if (!isValidPassword)
          return done(
            createHttpError.Unauthorized(messages.errors.auth.invalidPassword),
            false
          );

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Access Token Strategy
const accessOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => extractJwtFromCookies(req, "accessToken"),
  ]),
  secretOrKey: keys.jwt.accessSecret,
};
passport.use(
  "jwt-access",
  new JwtStrategy(accessOpts, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload._id);
      if (!user)
        return done(
          createHttpError.Unauthorized(messages.errors.auth.userNotFound),
          false
        );

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

// Refresh Token Strategy
const refreshOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => extractJwtFromCookies(req, "refreshToken"),
  ]),
  secretOrKey: keys.jwt.refreshSecret,
};
passport.use(
  "jwt-refresh",
  new JwtStrategy(refreshOpts, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload._id);
      if (!user)
        return done(
          createHttpError.Unauthorized(messages.errors.auth.userNotFound),
          false
        );

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
