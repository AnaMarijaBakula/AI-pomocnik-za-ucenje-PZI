// Prijava administratora
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Korisnik nije pronađen" });

        // Provjera lozinke
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Neispravna lozinka" });

        // Provjera da li je korisnik admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Nemate pravo pristupa kao administrator" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "7d" });

        res.status(200).json({ message: `Prijava uspješna (${user.role})`, token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Greška na serveru" });
    }
};
