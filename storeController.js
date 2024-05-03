const asyncHandler = require("express-async-handler");
const store = require("../models/storeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const Store = require("../models/storeModel");

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

// Function to get all products for a specific store
exports.getProductsForStore = asyncHandler(async (req, res) => {
  const storeId = req.params.storeId;

  // Find all products for the given store ID
  const products = await Product.find({ storeId });

  res.status(200).json({ count: products.length, products });
});

// Fetch all stores
exports.getStore = asyncHandler(async (req, res) => {
  try {
    const stores = await store.find({});
    console.log("Fetched stores:", stores);
    if (stores.length === 0) {
      return res.status(404).json({ success: false, error: "No stores found." });
    }
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Add a new store
exports.addStore = asyncHandler(async (req, res) => {
  try {
    const newStore = await store.create(req.body);
    res.status(201).json({ success: true, data: newStore });
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Remove a store
exports.removeStore = asyncHandler(async (req, res) => {
  try {
    const removedStore = await store.findByIdAndRemove(req.params.id);
    if (!removedStore) {
      return res.status(404).json({ success: false, error: "Store not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error removing store:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
