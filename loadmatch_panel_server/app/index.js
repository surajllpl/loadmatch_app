require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
let cookieParser = require("cookie-parser");

const sequelize = require("./utils/db");

const User = require("./models/userModel");
const Load = require("./models/loadModel");
const Space = require("./models/spaceModel");
const Agent = require("./models/agentModel");
const Lead = require("./models/leadModel");
const Interaction = require("./models/interactionModel");
const Enquiry = require("./models/enquiryModel");

const models = {
  User,
  Load,
  Space,
  Agent,
  Lead,
  Interaction,
  Enquiry,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

const userRoutes = require("./routes/userRoutes");
const agentRoutes = require("./routes/agentRoutes");
const loadRoutes = require("./routes/loadRoutes");
const leadRoutes = require("./routes/leadRoutes");
const spaceRoutes = require("./routes/spaceRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:1212",
    "http://localhost:1211",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://loadmatch.app",
    "https://www.loadmatch.app",
    "http://adminclient:8080",
    "http://liteclient:8081",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to LoadMatch....");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", agentRoutes);
app.use("/api/v1", loadRoutes);
app.use("/api/v1", spaceRoutes);
app.use("/api/v1", enquiryRoutes);
app.use("/api/v1", leadRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models have been synchronized with the database.");

    const PORT = process.env.NODE_DOCKER_PORT || 8081;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
