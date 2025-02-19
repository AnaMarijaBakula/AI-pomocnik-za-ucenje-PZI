const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();
const userMiddleware = require("../middlewares/usersMiddleware");

const SECRET_KEY = process.env.JWT_SECRET || "tajni_kljuc";

// Registracija korisnika
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (role === "admin") return res.status(403).json({ message: "Ne možete registrirati admina ovim putem" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Korisnik već postoji" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, role });

        await newUser.save();
        res.status(201).json({ message: "Korisnik registriran" });
    } catch (error) {
        res.status(500).json({ message: "Greška na serveru", error: error.message });
    }
};
// Prijava korisnika
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Korisnik nije pronađen" });

        // Provjera lozinke
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Neispravna lozinka" });

        // Ako je korisnik admin, nema problema sa prijavom
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "7d" });

        res.status(200).json({ message: `Prijava uspješna (${user.role})`, token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Greška na serveru" });
    }
};


// Prijava kao gost (samo klikom, bez registracije)
const guestLogin = async (req, res) => {
    try {
        // Generiraj token za gosta
        const guestToken = jwt.sign(
            { role: "guest", projectsLeft: 3 }, // 3 preostala projekta
            SECRET_KEY,
            { expiresIn: "3d" } // Token traje 3 dana
        );

        // Pohranjivanje podataka o gostu
        const guestData = {
            expiresAt: new Date().getTime() + 3 * 24 * 60 * 60 * 1000, // 3 dana od sada
            projectsLeft: 3, // Gost može poslati samo 3 projekta
        };

        res.status(200).json({
            message: "Prijava kao gost uspješna!",
            token: guestToken,
            guestData: guestData,
        });
    } catch (error) {
        res.status(500).json({ message: "Greška pri prijavi gosta", error: error.message });
    }


};


// Provjera autentifikacije
const checkUser = (req, res) => {
    res.status(200).json({ message: "Provjera autentifikacije", user: req.user });
};

module.exports = { registerUser, loginUser, guestLogin, checkUser, userMiddleware };
