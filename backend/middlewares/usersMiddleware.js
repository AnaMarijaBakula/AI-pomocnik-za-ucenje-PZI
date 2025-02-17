const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "tajni_kljuc";

// Middleware za provjeru tokena
const userMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Nema tokena, pristup odbijen" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;

        // Provjera za gosta (ako je token istekao ili broj preostalih projekata je 0)
        if (req.user.role === "guest") {
            if (new Date() > req.user.expiresAt) {
                return res.status(403).json({ message: "Vrijeme gosta je isteklo" });
            }
            if (req.user.projectsLeft <= 0) {
                return res.status(403).json({ message: "Gost je iskoristio sve projekte" });
            }
        }

        next();
    } catch (error) {
        res.status(403).json({ message: "Nevažeći token" });
    }
};

module.exports = userMiddleware;
