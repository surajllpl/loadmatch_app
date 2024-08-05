const express = require("express");
const router = express.Router();
const loadController = require("../controller/loadController");
// const {verifyToken} = require("../middleware/authMiddleware");
const { verifyTokenLocal } = require("../middleware/authMiddleware");

const uploadMiddleware = require("../middleware/uploadMiddleware");

// POST : Add Load to Listing
router.post(
  "load/add",
  uploadMiddleware.array("image", 3),

  loadController.createLoad
);
// POST : Get Load Specific Route Listing
router.post(
  "loads/search/:userId",
  verifyTokenLocal,
  loadController.getSearchListings
);

router.get("user/loads/:userId", loadController.getUserLoads);
// GET : Get All Load Listing
router.get("loads/searchall/:userId", loadController.getAllListings);
// GET : Get Load by ID
router.get("load/:loadId", loadController.getLoadById);

module.exports = router;
