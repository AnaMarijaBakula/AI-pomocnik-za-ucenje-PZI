const express = require("express");
const router = express.Router();
const { loginAdmin, isAdmin } = require("../controllers/userControllers");
const User = require("../models/userModel");

// Admin login ruta
router.post("/admin/login", loginAdmin);

// Zaštićene admin rute
router.get("/admin/users", isAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Greška pri dobavljanju korisnika" });
    }
});

module.exports = router;
