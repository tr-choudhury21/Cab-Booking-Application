const express = require('express');
const { userRegistration, login, authController, logoutUser, logoutAdmin, getUserDetails, logoutDriver, driverRegistration } = require('../controllers/userController');

const {isAdminAuthenticated, isUserAuthenticated, isDriverAuthenticated} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', login);
router.get('/user/me', isUserAuthenticated, getUserDetails);
router.get('/admin/me', isAdminAuthenticated, getUserDetails);
router.get("/user/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.post("/driver/register", driverRegistration);
router.get("/driver/logout", isDriverAuthenticated, logoutDriver);

module.exports = router;
