const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./userModel");
const Agent = require("./agentModel");

const Lead = sequelize.define(
  "Lead",
  {
    lead_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, //step1
    reference_group: {
      type: DataTypes.STRING(255),
    }, //step1
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Agent,
        key: "agent_id",
      },
    }, //step1
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
    }, //step1
    contact: {
      type: DataTypes.STRING(255),
    }, //step1
    profile_status: {
      type: DataTypes.ENUM(
        "first_lead",
        "first_message",
        "first_call",
        "first_login",
        "second_call",
        "first_post",
        "enq_call",
        "first_enq",
        "not_interested"
      ),
    },
    first_post_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    }, //step1
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
    }, //step1
  },
  {
    tableName: "Leads",
    timestamps: false,
  }
);

Lead.associate = (models) => {
  Lead.belongsTo(models.Agent, {
    foreignKey: "created_by",
    as: "CreatedByAgent",
  });
  Lead.belongsTo(models.User, { foreignKey: "user_id", as: "User" });
};

module.exports = Lead;
