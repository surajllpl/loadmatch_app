const express = require("express");
const router = express.Router();
const enquiryController = require("../controller/enquiryController");
// const verifyToken = require("../middleware/authMiddleware");
const { verifyTokenLocal } = require("../middleware/authMiddleware");

// Create a new enquiry
router.post("enquiries/create", enquiryController.createBookEnquiry);

// Show all enquiries
router.get("enquiries", verifyTokenLocal, enquiryController.getAllEnquiries);

// Get enquiries of a specific user
router.get(
  "enquiries/user/:userId",
  verifyTokenLocal,
  enquiryController.getEnquiriesByUserId
);

// Modify enquiry from user side (change status from pending to confirmed)
router.put(
  "enquiries/:enquiryId",
  verifyTokenLocal,
  enquiryController.modifyEnquiryFromUser
);

module.exports = router;
