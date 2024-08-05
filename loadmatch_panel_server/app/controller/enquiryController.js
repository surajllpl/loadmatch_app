const Enquiry = require("../models/enquiryModel");
exports.createBookEnquiry = async (req, res) => {
  try {
    const { by_user_id, to_user_id, for_load_id, for_space_id } = req.body;
    console.log(
      by_user_id,
      to_user_id,
      for_load_id,
      for_space_id,
      "enquiry details"
    );
    const existingEnquiry = await Enquiry.findOne({
      where: {
        by_user_id,
        for_load_id,
        for_space_id,
      },
    });
    if (existingEnquiry) {
      return res.status(400).json({
        message: "An enquiry for this load and space already exists.",
        status: "error",
        data: null,
      });
    }
    const enquiry = await Enquiry.create({
      by_user_id,
      to_user_id,
      for_load_id,
      for_space_id,
    });

    res.status(201).json({
      message: "Enquiry created successfully",
      success: true,
      data: enquiry,
    });
  } catch (error) {
    const errorMessage = "Failed to create enquiry";
    console.error(errorMessage, error);
    res.status(400).json({
      message: errorMessage,
      success: false,
      status: "error",
      data: null,
    });
  }
};

// Controller to show all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll();
    res.json({
      message: "Enquiries retrieved successfully",
      status: "success",
      success: true,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve enquiries",
      status: "error",
      data: null,
      success: false,
    });
  }
};

// Controller to get enquiries of a specific user
exports.getEnquiriesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const enquiries = await Enquiry.findAll({ where: { to_user_id: userId } });
    res.json({
      message: "Enquiries retrieved successfully",
      status: "success",
      success: true,

      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve enquiries",
      status: "error",
      data: null,
      success: false,
    });
  }
};

// Controller to modify enquiry from user side (change status from pending to confirmed)
exports.modifyEnquiryFromUser = async (req, res) => {
  const enquiryId = req.params.enquiryId;
  try {
    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
        status: "error",
        data: null,
      });
    }

    // Update the status from pending to confirmed
    enquiry.status = "hard match";
    await enquiry.save();

    res.json({
      message: "Enquiry status updated successfully",
      status: "success",
      success: true,

      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update enquiry status",
      status: "error",
      data: null,
    });
  }
};
