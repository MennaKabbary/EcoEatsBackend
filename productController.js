const asyncHandler = require('express-async-handler');
const Product = require('../models/storeProductsModel');

// Controller to get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
});

// Controller to create a new product
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description } = req.body;
  const product = await Product.create({ name, price, image, description})
  .then(async (product) => {

  })
  res.status(201).json(product);
});

// Controller to get a single product by ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

// Controller to update a product by ID
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description } = req.body;
  let product = await Product.findById(req.body.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.name = name;
  product.price = price;
  product.image = image;
  product.description = description;
  product = await product.save();
  res.status(200).json(product);
});

// Controller to delete a product by ID
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.remove();
  res.status(200).json({ message: 'Product deleted successfully' });
});
