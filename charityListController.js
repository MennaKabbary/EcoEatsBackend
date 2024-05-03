const asyncHandler = require('express-async-handler');
const CharityList = require('../models/charityListModel');

// Controller to get all Charity List Memebrs
exports.getAllCharityList = asyncHandler(async (req, res) => {
  const charityList = await CharityList.find();
  res.status(200).json(charityList);
});

// Controller to add to Charity List
exports.addToCharityList = asyncHandler(async (req, res) => {
  const { name, familyCount, description } = req.body;
  const charityList = await CharityList.create({ name, familyCount, description})
  .then(async (charityList) => {

  })
  res.status(201).json(charityList);
});

// Controller to get a specific Charity List Member product by ID
exports.getFromCharityListById = asyncHandler(async (req, res) => {
  const charityList = await CharityList.findById(req.body.id);
  if (!charityList) {
    res.status(404);
    throw new Error('Charity List Member not found');
  }
  res.status(200).json(charityList);
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
