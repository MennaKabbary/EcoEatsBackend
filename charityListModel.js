const mongoose = require('mongoose');

const charityListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  familyCount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const CharityList = mongoose.model('CharityLists', charityListSchema);

module.exports = CharityList;
 