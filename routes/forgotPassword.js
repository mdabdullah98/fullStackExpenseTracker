const express = require("express");
const forgotPasswordRouter = express.Router();
const ForgotPasswordController = require("../controller/forgotPassword");

forgotPasswordRouter
  .post(
    "/forgot-password/verify-email",
    ForgotPasswordController.authenticateUSer
  )
  .post(
    "/forgot-password/reset-password",
    ForgotPasswordController.resetUserPassword
  );
module.exports = forgotPasswordRouter;
