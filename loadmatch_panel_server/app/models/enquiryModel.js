const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./userModel");
const Load = require("./loadModel");
const Space = require("./spaceModel");
const Agent = require("./agentModel");

const Enquiry = sequelize.define(
  "Enquiry",
  {
    enquiry_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    for_load_id: {
      type: DataTypes.STRING,
      references: {
        model: Load,
        key: "load_id",
      },
    },
    for_space_id: {
      type: DataTypes.STRING,
      references: {
        model: Space,
        key: "space_id",
      },
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "soft match",
        "hard match",
        "closed",
        "not matched",
        "not closed (price)",
        "not closed (technical)",
        "not closed (logistical)"
      ),
      defaultValue: "pending",
      allowNull: false,
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
    agent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Agent,
        key: "agent_id",
      },
    },
    by_user_quote: {
      type: DataTypes.DOUBLE,
    },
    to_user_quote: {
      type: DataTypes.DOUBLE,
    },
    final_price: {
      type: DataTypes.DOUBLE,
    },
    commission: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    tableName: "Enquiries",
    timestamps: false,
  }
);

Enquiry.associate = (models) => {
  Enquiry.belongsTo(models.User, {
    foreignKey: "by_user_id",
    as: "EnquiriesSent",
  });
  Enquiry.belongsTo(models.User, {
    foreignKey: "to_user_id",
    as: "EnquiriesReceived",
  });
  Enquiry.belongsTo(models.Load, {
    foreignKey: "for_load_id",
    as: "EnquiryForLoad",
  });
  Enquiry.belongsTo(models.Space, {
    foreignKey: "for_space_id",
    as: "EnquiryForSpace",
  });
  Enquiry.belongsTo(models.Agent, {
    foreignKey: "agent_id",
    as: "EnqAssignedTo",
  });
};

module.exports = Enquiry;
