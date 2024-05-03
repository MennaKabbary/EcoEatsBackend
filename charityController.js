const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const charity = require("../models/charityModel");
const CharityList = require('../models/charityListModel');



exports.login = (req, res, next) => {
  var email = req.body.email;
  var Password = req.body.password;

  Store.findOne({ email: email }).then((store) => {
    if (store) {
      bcrypt.compare(Password, store.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ id: store._id }, "verySecretValue", {
            expiresIn: "1h",
          });
          res.cookie("Store", token);
          res.redirect("/views/home");
        } else {
          console.log("Incorrect Password");
          res.redirect("/");
        }
      });
    } else {
      console.log("Incorrect Username");
      res.redirect("/");
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("Store").redirect("/");
};

exports.getIdFromCookie = (req, res) => {
  const info = req.cookies;
  const token = info.User;
  const payload = jwt.decode(token);
  const id = payload.id;
  return id;
};

// Function to get all charityMembers for a specific charity
exports.getMembersForCharity = asyncHandler(async (req, res) => {
  const charityId = req.params.charityId;

  // Find all charityMembers for the given charity ID
  const charityMembers = await charityMember.find({ charityId });

  res.status(200).json({ count: charityMembers.length, charityMembers });
});

// Fetch all charities
exports.getCharity = asyncHandler(async (req, res) => {
  try {
    const charities = await charity.find({});
    console.log("Fetched charities:", charities);
    if (charities.length === 0) {
      return res.status(404).json({ success: false, error: "No charities found." });
    }
    res.status(200).json({ success: true, count: charities.length, data: charities });
  } catch (error) {
    console.error("Error fetching charities:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Add a new charity
exports.addCharity = asyncHandler(async (req, res) => {
  try {
    const newCharity = await charity.create(req.body);
    res.status(201).json({ success: true, data: newCharity });
  } catch (error) {
    console.error("Error adding charity:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Controller to add to Charity List
exports.addToCharityList = asyncHandler(async (req, res) => {
  const { name, familyCount, description } = req.body;
  const charityList = await CharityList.create({ name, familyCount, description})
  .then(async (charityList) => {
    
  })
  res.status(201).json(charityList);
});

// Controller to update a Charity List Member by ID
exports.updateCharityList = asyncHandler(async (req, res) => {
  const { name, familyCount, description } = req.body;
  let charityList = await CharityList.findById(req.body.id);
  if (!charityList) {
    res.status(404);
    throw new Error('Charilty List Member not found');
  }
  charityList.name = name;
  charityList.familyCount = familyCount;
  charityList.description = description;
  charityList = await charityList.save();
  res.status(200).json(charityList);
});

// Controller to delete a Charity List Member by ID
exports.deleteCharityListMember = asyncHandler(async (req, res) => {
  const prcharityListoduct = await CharityList.findById(req.body.id);
  if (!charityList) {
    res.status(404);
    throw new Error('Charity List Member is not found');
  }
  await charityList.remove();
  res.status(200).json({ message: 'Charity List Member deleted successfully' });
});


// Remove a charity
exports.removeCharity = asyncHandler(async (req, res) => {
  try {
    const removedCharity = await charity.findByIdAndRemove(req.params.id);
    if (!removedCharity) {
      return res.status(404).json({ success: false, error: "Charity not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error removing charity:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
