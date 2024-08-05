const Agent = require("../models/agentModel");
const Lead = require("../models/leadModel");
const User = require("../models/userModel");

const createLead = async (req, res) => {
  const { reference_group, created_by, name, contact, profile_status } =
    req.body;

  try {
    const lead = await Lead.create({
      reference_group,
      created_by,
      name,
      contact,
      profile_status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
};

const updateLead = async (req, res) => {
  const { contact, agentDetail, messageText, profile_status } = req.body;
  console.log(contact, agentDetail, messageText, profile_status);
  try {
    // Find the lead by contact
    let lead = await Lead.findOne({ contact: contact });
    console.log(lead);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead Not Found",
        status: 404,
      });
    } else {
      lead.profile_status = profile_status;
    }

    const updatedLead = await lead.save();

    return res.status(200).json({
      success: true,
      data: updatedLead,
      message: "Lead updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const getAllLeadsByAgentId = async (req, res) => {
  const { agentId } = req.params;
  console.log(agentId);
  try {
    const leads = await Lead.findAll({
      where: {
        created_by: agentId,
      },
      include: [
        {
          model: User,
          as: "User",
        },
        {
          model: Agent,
          as: "CreatedByAgent",
        },
      ],
      order: [["created_at", "ASC"]],
    });

    if (!leads || leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No leads found for this agent`,
        status: 404,
      });
    }

    return res.status(200).json({
      success: true,
      data: leads,
      message: "Leads Retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error getting all leads of agent:", error);
    res
      .status(500)
      .json({ success: false, message: "An Error Occurred Getting Leads" });
  }
};

module.exports = { createLead, updateLead, getAllLeadsByAgentId };
