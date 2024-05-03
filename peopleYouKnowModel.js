const mongoose = require("mongoose");

const peopleYouKnowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      address:{
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
})
const peopleYouKnow = mongoose.model("PeopleYouKnow", userSchema);

module.exports = peopleYouKnow;
