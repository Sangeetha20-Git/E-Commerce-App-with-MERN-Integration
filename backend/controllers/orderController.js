const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;

        const order = await Order.create({
            user: req.user.id,
            products,
            totalAmount,
        });

        return res.status(201).json({
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,
        }).populate("products.product");

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get all orders - Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Update order status - Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};