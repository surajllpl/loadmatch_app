const express = require("express");
const router = express.Router();
const spaceController = require("../controller/spaceController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
// const verifyToken = require("../middleware/authMiddleware");
const { verifyTokenLocal } = require("../middleware/authMiddleware");

// POST : Add Space to Listing
router.post(
  "space/add",
  uploadMiddleware.array("image", 3),
  spaceController.createSpace
);

// POST : Get Space Specific Route Listing
router.post(
  "spaces/search/:userId",
  verifyTokenLocal,
  spaceController.getSearchListingSpaces
);
router.get(
  "user/spaces/:userId",
  verifyTokenLocal,
  spaceController.getUserSpaces
);
// GET : Get All Space Listing
router.get(
  "spaces/searchall/:userId",
  verifyTokenLocal,
  spaceController.getAllListings
);
// GET : Get Space by ID
router.get("space/:spaceId", verifyTokenLocal, spaceController.getSpaceById);
module.exports = router;
