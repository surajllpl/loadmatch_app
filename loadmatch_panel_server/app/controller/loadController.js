const { Op } = require("sequelize");
const Load = require("../models/loadModel");
const upload = require("../config/s3.config");

// POST: Add Load to Listing
exports.createLoad = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const imageUrls = req.files.map((file) => file.location);
    const {
      from_city,
      from_pin,
      to_city,
      to_pin,
      length,
      width,
      height,
      weight,
      created_by,
      active,
    } = req.body;

    const newLoad = await Load.create({
      from_city,
      from_pin,
      to_city,
      to_pin,
      image_urls: imageUrls,
      length,
      width,
      height,
      weight,
      active,
      created_by,
    });

    const loadId = newLoad.id;

    return res.status(201).json({
      success: true,
      message: "Load created successfully",
      data: { loadId, newLoad },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Error uploading image and creating Load",
    });
  }
};

// POST: Get Load Specific Route Listing
exports.getSearchListings = async (req, res) => {
  console.log("get method call");
  try {
    const { from_city: fromCity, to_city: toCity } = req.body;
    const userId = req.params.userId;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const { count, rows } = await Load.findAndCountAll({
      where: {
        from_city: fromCity,
        to_city: toCity,
        created_by: { [Op.not]: userId },
      },
      offset: offset,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    res.status(200).json({
      success: true,
      counts: count,
      loads: rows,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET: Get All Load Listing
exports.getUserLoads = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userLoads = await Load.findAll({
      where: {
        created_by: userId,
      },
    });

    res.status(200).json({
      success: true,
      total: userLoads.length,
      data: userLoads,
      message: "User Loads Successfully Retrieved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET : Get Load by ID
exports.getLoadById = async (req, res) => {
  try {
    const loadId = req.params.loadId;
    const load = await Load.findByPk(loadId);
    if (!load) {
      return res
        .status(404)
        .json({ success: false, message: "Load not found" });
    }
    return res.status(200).json({ success: true, data: load });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// POST : Get Load Specific Route Listing
exports.getAllListings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Load.findAndCountAll({
      where: {
        created_by: { [Op.not]: userId },
      },
      offset: offset,
      limit: pageSize,
    });

    return res.status(200).json({
      success: true,
      counts: count,
      currentPage: page,
      data: rows,
      totalPages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
