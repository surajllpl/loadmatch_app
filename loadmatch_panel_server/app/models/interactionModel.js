const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Agent = require("./agentModel");
const Lead = require("./leadModel");

const Interaction = sequelize.define(
  "Interaction",
  {
    interaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    of_agent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Agent,
        key: "agent_id",
      },
    },
    for_lead_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Lead,
        key: "lead_id",
      },
    },
    interaction_type: {
      type: DataTypes.ENUM(
        "whatsapp message info",
        "whatsapp message post",
        "call account signup",
        "call post",
        "call enquiry",
        "call softmatch",
        "call hardmatch",
        "call closing",
        "call review",
        "call reference",
        "message softmatch reject",
        "message softmatch accept"
      ),
    },
    summary: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "Interactions",
    timestamps: false,
  }
);

Interaction.associate = (models) => {
  Interaction.belongsTo(models.Agent, {
    foreignKey: "of_agent_id",
    as: "Agent",
  });
  Interaction.belongsTo(models.Lead, { foreignKey: "for_lead_id", as: "Lead" });
};

module.exports = Interaction;
