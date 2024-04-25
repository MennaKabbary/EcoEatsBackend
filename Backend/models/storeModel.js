const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true  
    },
    image: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]
    
});
let store = mongoose.model("store", storeSchema);

module.exports = store;