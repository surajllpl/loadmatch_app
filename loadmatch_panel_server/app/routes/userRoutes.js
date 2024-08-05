const express = require("express");
const { verifyTokenOTPless } = require("../middleware/verifyTokenMiddleware");
const { verifyTokenLocal } = require("../middleware/authMiddleware");
const userController = require("../controller/userController");

const router = express.Router();

// login-signup -> createUser or UpdateUser
router.post("/verify-user", verifyTokenOTPless, userController.createUser);

router.get(
  "users/details/:userId",
  verifyTokenLocal,
  userController.fetchUserData
);

module.exports = router;
