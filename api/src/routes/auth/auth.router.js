const express = require("express");
const authRouter = express.Router();
const authController = require("./auth.controller");
const passport = require("../../services/passport");
// Register route
authRouter.post("/checkusername", authController.checkUsernameAvailability);

// Register route
authRouter.post("/register", authController.register);

// Login route
authRouter.post("/login", authController.login);

// Logout route
authRouter.get("/logout", authController.logout);

// Route for checking if a user is signed in
authRouter.get(
  "/signedin",
  passport.authenticate("jwt", { session: false }),
  authController.checkSignedIn
);

authRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authController.getAllUsersByOrgId
);

module.exports = { authRouter };
