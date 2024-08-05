## Loadmatch - admin-server

Initial setup node application :

    cmd :   npm init
            npm i express pg sequelize cors body-parser morgan

Setting Up Express Server :

    - root folder -->  index.js file.

    What we do here:

        – import express and cors,body-parser,morgan modules:

        - Express is for building the Rest apis
        - cors provides Express middleware to enable CORS with various options.

        terminal cmd : npm i express cors body-parser morgan

        - import dotenv for env files

Folder structure :

    - app
        - models
        - controllers
        - routes
        - utils
            - db connection
        - index.js - startup file

startup scripts :

    npm i nodemon -> for continuous updates.

    "dev" : "nodemon app/index.js",
    "start" : "node app/index.js",

database connection :

    packages : npm i sequelize

    dbconfig file

> Models Creation according to associations :

    // models
    const User = require("./models/userModel");
    const Load = require("./models/loadModel");
    const Agent = require("./models/agentModel");
    const Lead = require("./models/leadModel");
    const Interaction = require("./models/interactionModel");

    const models = {
    User,
    Load,
    Agent,
    Lead,
    Interaction,
    };

    // Setup associations
    Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
    });

> DO S3 Bucket setup for file upload

    - s3 config.js
        - npm i aws-sdk multer multer-s3

    - setup env accordingly

> OTPless Integration

    - Step 1: Install the OTPLess SDK

        npm install otpless-node-js-auth-sdk
