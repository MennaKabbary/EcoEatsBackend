const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// Function to submit a new order
exports.submitOrder = asyncHandler(async (req, res) => {
    const { items, totalPrice, customerName, address } = req.body;

    const order = new Order({
        items,
        totalPrice,
        customerName,
        address
    });

    await order.save();

    res.status(201).json({ message: "Order submitted successfully", order });
});

// Function to get all orders
exports.getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.status(200).json({ count: orders.length, orders });
});

// Function to get a single order by ID
exports.getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404).json({ message: "Order not found" });
    } else {
        res.status(200).json({ order });
    }
});

// Function to update an existing order by ID
exports.updateOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const { items, totalPrice, customerName, address } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404).json({ message: "Order not found" });
    } else {
        order.items = items || order.items;
        order.totalPrice = totalPrice || order.totalPrice;
        order.customerName = customerName || order.customerName;
        order.address = address || order.address;

        await order.save();
        res.status(200).json({ message: "Order updated successfully", order });
    }
});

// Function to delete an order by ID
exports.deleteOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404).json({ message: "Order not found" });
    } else {
        await order.remove();
        res.status(200).json({ message: "Order deleted successfully" });
    }
});
