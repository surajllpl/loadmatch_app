const express = require("express");
const { verifyTokenLocal } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createLead,
  updateLead,
  getAllLeadsByAgentId,
} = require("../controller/leadController");

router.post("lead-create", verifyTokenLocal, createLead);

router.patch("lead-update", verifyTokenLocal, updateLead);

router.get("lead-list/:agentId", verifyTokenLocal, getAllLeadsByAgentId);

module.exports = router;
