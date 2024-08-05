const { where } = require("sequelize");
const { Op } = require("sequelize");
const Space = require("../models/spaceModel");

// POST : Add Space to Listing
exports.createSpace = async (req, res) => {
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
      created_by,
      length,
      width,
      height,
      weight,
      stop_1,
      stop_2,
      stop_3,
      stop_4,
      stop_5,
      stop_6,
      active,
    } = req.body;
    const space = await Space.create({
      from_city,
      from_pin,
      to_city,
      to_pin,
      image_urls: imageUrls,
      created_by,
      length,
      width,
      height,
      weight,
      stop_1,
      stop_2,
      stop_3,
      stop_4,
      stop_5,
      stop_6,
      active,
    });
    const spaceId = space.id;

    return res.status(201).json({
      success: true,
      message: "Space created successfully",
      data: { space, spaceId },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Error uploading image and creating Space",
    });
  }
};
// POST : Get Space Specific Route Listing
exports.getSearchListingSpaces = async (req, res) => {
  try {
    const { from_city: fromCity, to_city: toCity } = req.body;
    const userId = req.params.userId;

    const response = [];
    let direct_route = 0;

    const rows = await Space.findAll({
      where: {
        to_city: toCity,
        created_by: { [Op.not]: userId },
      },
    });

    rows.forEach((row) => {
      if (row.from_city === fromCity) {
        direct_route = 1;
        response.push(row);
      } else if (
        row.stop_1 === fromCity ||
        row.stop_2 === fromCity ||
        row.stop_3 === fromCity ||
        row.stop_4 === fromCity ||
        row.stop_5 === fromCity ||
        row.stop_6 === fromCity
      ) {
        response.push(row);
      }
    });

    res.status(200).json({
      success: true,
      direct_route: direct_route,
      count: response.length,
      filteredIds: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET : Get All UserSpaces Listing
exports.getUserSpaces = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userSpaces = await Space.findAll({
      where: {
        created_by: userId,
      },
    });
    res.status(200).json({
      success: true,
      total: userSpaces.length,
      data: userSpaces,
      message: "User Spaces Successfully Retrieved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET : Get All Space Listing
exports.getAllListings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Space.findAndCountAll({
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

// GET : Get Space by ID
exports.getSpaceById = async (req, res) => {
  try {
    const spaceId = req.params.spaceId;
    const space = await Space.findByPk(spaceId);
    if (!space) {
      return res
        .status(404)
        .json({ success: false, message: "space not found" });
    }
    return res.status(200).json(space);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
