const express = require("express");
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Create an order - logged-in user
router.post("/", protect, createOrder);

// Get my orders - logged-in user
router.get("/my-orders", protect, getMyOrders);

// Get all orders - admin
router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getAllOrders
);

// Update order status - admin
router.put(
    "/:id/status",
    protect,
    authorizeRoles("admin"),
    updateOrderStatus
);

module.exports = router;