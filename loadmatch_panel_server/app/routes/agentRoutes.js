const express = require("express");
const agentController = require("../controller/agentController");
const { verifyTokenLocal } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("admin/signup", agentController.agentSignUp);
router.post("admin/login", agentController.agentLogin);
router.get("admin/allagents", verifyTokenLocal, agentController.getAllAgents);

module.exports = router;
