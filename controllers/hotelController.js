const mongoose = require("mongoose");
const Hotel = require("../models/hotelModel");
const user = require("../models/userModel");
var jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { verifyToken } = require("../helpers/verifyToken");

const createHotel = async (req, res) => {
  const { name, description } = req.body;

  const checkAccessToken = req.headers.authorization;

  if (!checkAccessToken) {
    return res.status(400).json({
      success: false,
      message: "No access token found"
    });
  }

  const user_id = await verifyToken(req.headers.authorization);
  console.log("user id in hotel controller ", user_id);

  try {
    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "name is required." });
    }

    const newHotel = await Hotel.create({
      name,
      description,
      createdBy: user_id
    });
    await newHotel.save();
    return res.status(201).json({
      success: true,
      message: "Hotel created successfully.",
      hotel: newHotel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

//get hotel start

const getHotel = async (req, res) => {
  const { id } = req.body;
  const checkAccessToken = req.headers.authorization;

  if (!checkAccessToken) {
    return res.status(400).json({
      success: false,
      message: "No access token found"
    });
  }
  const user_id = await verifyToken(req.headers.authorization);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid hotel ID."
    });
  }
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found."
      });
    }

    return res.status(200).json({
      success: true,
      hotel: hotel
    });
  } catch (error) {
    console.error(error);
  }
};

// get hotel end

// update hotel start

const updateHotel = async (req, res) => {
  const { id } = req.body;
  const { name, description } = req.body;

  const checkAccessToken = req.headers.authorization;

  if (!checkAccessToken) {
    return res.status(400).json({
      success: false,
      message: "No access token found"
    });
  }
  const user_id = await verifyToken(req.headers.authorization);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid hotel ID."
    });
  }
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found."
      });
    }

    // console.log("user id is ", user_id);
    // console.log(typeof user_id);
    // console.log("created by is ", hotel.createdBy);
    // const createdBy = hotel.createdBy;
    // console.log(typeof createdBy.toString());

    if (user_id !== hotel.createdBy.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to update this hotel."
      });
    }

    hotel.name = name;
    hotel.description = description;

    hotel.save();

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully.",
      hotel: hotel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error."
    });
  }
};

// update hotel end

// delete hotel start

const deleteHotel = async (req, res) => {
  const checkAccessToken = req.headers.authorization;
  const { id } = req.body;

  if (!checkAccessToken) {
    return res.status(400).json({
      success: false,
      message: "No access token found"
    });
  }
  const user_id = await verifyToken(req.headers.authorization);
  // console.log(user_id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid hotel ID."
    });
  }

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found."
      });
    }

    if (user_id !== hotel.createdBy.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to delete this hotel."
      });
    }

    const deleteHotel = await Hotel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully.",
      deleteHotel: deleteHotel
    });
  } catch (error) {
    console.error(error);
  }
};

// delete hotel end


// Get all hotels start
const getAllHotels = async (req, res) => {};

module.exports = {
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel
};
