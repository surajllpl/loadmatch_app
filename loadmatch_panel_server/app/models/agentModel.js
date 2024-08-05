const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Agent = sequelize.define(
  "Agent",
  {
    agent_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("online", "offline", "away", "inactive"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW() + INTERVAL '5 hours 30 minutes'"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW() + INTERVAL '5 hours 30 minutes'"),
      allowNull: false,
    },
  },
  {
    tableName: "Agents",
    timestamps: false,
  }
);

Agent.associate = (models) => {
  Agent.hasMany(models.Lead, { foreignKey: "created_by", as: "Leads" });
  Agent.hasMany(models.Interaction, {
    foreignKey: "of_agent_id",
    as: "Interactions",
  });
};

module.exports = Agent;
