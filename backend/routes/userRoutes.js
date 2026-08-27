const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get(
    "/admin",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin",
        });
    }
);

module.exports = router;