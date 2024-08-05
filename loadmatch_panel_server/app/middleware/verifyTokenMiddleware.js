const axios = require("axios");
const querystring = require("querystring");
const User = require("../models/userModel");

const verifyTokenOTPless = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log("Received token:", token);

    const postData = querystring.stringify({
      token: `${token}`,
      client_id: `${process.env.OTPLESS_CLIENT_ID}`,
      client_secret: `${process.env.OTPLESS_CLIENT_SECRET}`,
    });
    console.log(postData);
    const response = await axios.post(
      "https://auth.otpless.app/auth/userInfo",
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Response:", response.data);

    req.userData = response.data;

    next();
  } catch (error) {
    console.error("Error verifying user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to verify user.",
      error: error.message,
    });
  }
};

module.exports = { verifyTokenOTPless };
