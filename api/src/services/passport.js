const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require("../services/db");
const jwtSecret = process.env.JWT_SECRET_KEY;

// Define options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

// Configure JWT strategy
const jwtStrategy = new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id).select("-password");
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

// Use JWT strategy with Passport
passport.use(jwtStrategy);

module.exports = passport;
