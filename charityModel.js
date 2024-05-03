const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
    CharityName: {
        type: String,
        required: true
    },
    ContactInformation: {
        type: String,
        required: true
    },
    Hotline: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Mission: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    charityList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CharityLists'
    }]
});
let charity = mongoose.model("charity", charitySchema);

module.exports = charity;
