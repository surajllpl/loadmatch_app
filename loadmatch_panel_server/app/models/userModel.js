const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

User.associate = (models) => {
  User.hasMany(models.Load, { foreignKey: "created_by", as: "Loads" });
  User.hasMany(models.Space, { foreignKey: "created_by", as: "Spaces" });
  User.hasMany(models.Enquiry, {
    foreignKey: "by_user_id",
    as: "EnquiriesSent",
  });
  User.hasMany(models.Enquiry, {
    foreignKey: "to_user_id",
    as: "EnquiriesReceived",
  });
  User.hasMany(models.Lead, { foreignKey: "user_id", as: "Leads" });
};

module.exports = User;
