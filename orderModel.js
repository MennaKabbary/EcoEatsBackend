const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [{ 
        type: String, 
        required: true 
    }],
    totalPrice: { 
        type: Number, 
        required: true 
    },
    customerName: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
