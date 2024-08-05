const { UserDetail } = require("otpless-node-js-auth-sdk");
const User = require("../models/user2Model");

const sendMagicLink = async (req, res) => {
  const { mobile, email, channel } = req.body;

  try {
    const magicLinkTokens = await UserDetail.magicLink(
      mobile,
      email,
      process.env.OTPLESS_REDIRECT_URI,
      channel,
      process.env.OTPLESS_CLIENT_ID,
      process.env.OTPLESS_CLIENT_SECRET
    );

    if (magicLinkTokens.success) {
      return res.status(200).json({
        message: "Magic link sent successfully.",
        requestIds: magicLinkTokens.requestIds,
      });
    } else {
      return res.status(400).json({
        message: "Failed to send magic link.",
        error: magicLinkTokens.errorMessage,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

const handleVerifiedUser = async (req, res) => {
  const { firebaseInfo, identities } = req.body;

  const { identityValue } = identities[0];

  try {
    let user = await User.findOne({ where: { identityValue } });

    if (!user) {
      user = await User.create({
        identityValue,
        idToken: firebaseInfo.idToken,
        sessionToken: firebaseInfo.sessionInfo.sessionToken,
        contact: identityValue,
      });
    } else {
      user.idToken = firebaseInfo.idToken;
      user.sessionToken = firebaseInfo.sessionInfo.sessionToken;
      await user.save();
    }

    return res.status(200).json({
      message: "User authenticated successfully.",
      success: true,
      data: {
        user_id: user.user_id,
        identityValue: user.identityValue,
        idToken: user.idToken,
        sessionToken: user.sessionToken,
        name: user.name,
        contact: user.contact,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", success: false, error: error.message });
  }
};

module.exports = { sendMagicLink, handleVerifiedUser };
