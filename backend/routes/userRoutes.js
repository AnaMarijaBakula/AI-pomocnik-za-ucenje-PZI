const express = require('express');
const router = express.Router();
const { registerUser, loginUser, guestLogin, userMiddleware, checkUser} = require('../controllers/userControllers');

// Ruta za registraciju korisnika
router.post('/register', registerUser);

// Ruta za prijavu korisnika
router.post('/login', loginUser);

// Ruta za prijavu gosta
router.post("/guest", guestLogin);

// Ruta koja zahtijeva autentifikaciju
router.get("/check-user",userMiddleware, checkUser);

module.exports = router;
