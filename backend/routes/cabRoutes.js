const express = require('express');
const router = express.Router();
const { getAllCabs, addCab } = require('../controllers/cabController');

router.get('/', getAllCabs);
router.post('/', addCab);

module.exports = router;
