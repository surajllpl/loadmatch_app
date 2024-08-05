const User = require("../models/userModel");
const Jwt = require("jsonwebtoken");
const jwtKey = require("../config/auth.config");

const createUser = async (req, res) => {
  try {
    console.log(req.userData, "req.userData");
    const { name, email, phone_number, country_code, authMode } = req.userData;

    const actualPhoneNumber = phone_number.replace("+91", "");

    let user = await User.findOne({
      where: { phone_number: actualPhoneNumber },
    });

    if (!user) {
      const newUser = await User.create({
        name,
        email,
        phone_number: actualPhoneNumber,
        country_code: "+91",
        authMode: "WhatsApp",
      });

      const authToken = Jwt.sign({ user_id: newUser.user_id }, jwtKey.secret, {
        expiresIn: 2592000,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: newUser,
        authToken: authToken,
      });
    } else {
      user.name = name;
      user.email = email;
      user.phone_number = actualPhoneNumber;
      user.country_code = "+91";
      await user.save();

      const authToken = Jwt.sign({ user_id: user.user_id }, jwtKey.secret, {
        expiresIn: 2592000,
      });

      return res.status(201).json({
        success: true,
        message: "User updated successfully.",
        user: user,
        authToken: authToken,
      });
    }
  } catch (error) {
    console.error("Error creating/updating user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create/update user.",
      error: error.message,
    });
  }
};

const createUserbyAgent = async (req, res) => {
  try {
    console.log(req.userData, "req.userData");
    const { name, email, phone_number, country_code, authMode } = req.userData;

    const actualPhoneNumber = phone_number.replace("+91", "");

    let user = await User.findOne({
      where: { phone_number: actualPhoneNumber },
    });

    if (!user) {
      const newUser = await User.create({
        name,
        email,
        phone_number: actualPhoneNumber,
        country_code: "+91",
        authMode: "WhatsApp",
      });

      const authToken = Jwt.sign({ user_id: newUser.user_id }, jwtKey.secret, {
        expiresIn: 2592000,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: newUser,
        authToken: authToken,
      });
    } else {
      user.name = name;
      user.email = email;
      user.phone_number = actualPhoneNumber;
      user.country_code = "+91";
      await user.save();

      const authToken = Jwt.sign({ user_id: user.user_id }, jwtKey.secret, {
        expiresIn: 2592000,
      });

      return res.status(201).json({
        success: true,
        message: "User updated successfully.",
        user: user,
        authToken: authToken,
      });
    }
  } catch (error) {
    console.error("Error creating/updating user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create/update user.",
      error: error.message,
    });
  }
};

const fetchUserData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userData = await User.findByPk(userId, {
      include: [
        { model: Load, as: "Loads" },
        { model: Space, as: "Spaces" },
        { model: Enquiry, as: "EnquiriesSent" },
        { model: Enquiry, as: "EnquiriesReceived" },
      ],
    });

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
        data: null,
      });
    }

    res.json({
      message: "User data retrieved successfully",
      status: "success",
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({
      message: "Failed to fetch user data",
      status: "error",
      data: null,
    });
  }
};

module.exports = { createUser, fetchUserData };
