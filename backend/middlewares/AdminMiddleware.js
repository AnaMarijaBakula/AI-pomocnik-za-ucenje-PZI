// Middleware za provjeru da li je korisnik admin
const isAdmin = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token nije pronađen" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Neispravan token" });
        if (user.role !== "admin") return res.status(403).json({ message: "Nemate pristup ovom resursu" });

        req.user = user;
        next();
    });
};

module.exports = { isAdmin };
