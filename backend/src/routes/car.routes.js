const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

module.exports = router;
