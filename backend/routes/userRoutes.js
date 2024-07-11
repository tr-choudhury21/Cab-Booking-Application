const express = require('express');
const { registerController, loginController, authController, logoutUser } = require('../controllers/userController');

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get("/logout",authMiddleware, logoutUser);

module.exports = router;
