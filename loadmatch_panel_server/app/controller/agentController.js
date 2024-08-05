const Agent = require("../models/agentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/auth.config");

exports.agentSignUp = async (req, res) => {
  try {
    const { name, contact, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = await Agent.create({
      name,
      contact,
      password: hashedPassword,
      role,
      status: "offline",
    });

    const token = jwt.sign({ agent_id: newAgent.agent_id }, jwtKey.secret, {
      expiresIn: "24h",
    });

    return res.status(201).json({ success: true, token, data: newAgent });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.agentLogin = async (req, res) => {
  try {
    const { contact, password } = req.body;

    const agent = await Agent.findOne({ where: { contact } });

    if (agent) {
      const isPasswordMatch = await bcrypt.compare(password, agent.password);

      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, error: "Incorrect password" });
      }

      const token = jwt.sign({ agent_id: agent.agent_id }, jwtKey.secret, {
        expiresIn: "24h",
      });

      return res.status(200).json({ success: true, token, agentDetail: agent });
    } else {
      return res.status(404).json({ success: false, error: "Agent not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
