const Cab = require('../models/Cab');

exports.getAllCabs = async (req, res) => {
    try {
        const cabs = await Cab.find();
        res.json(cabs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addCab = async (req, res) => {
    try {
        const newCab = new Cab(req.body);
        const cab = await newCab.save();
        res.json(cab);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
