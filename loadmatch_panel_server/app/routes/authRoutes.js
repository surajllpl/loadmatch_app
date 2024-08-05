const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authOtpMiddleware");

router.post("signin", authController.handleVerifiedUser);
// router.post("/verify-code", verifyToken, authController.handleVerifiedUser);

module.exports = router;
