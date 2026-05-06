const carService = require('../services/car.service');
const asyncHandler = require('../utils/asyncHandler');

const getAllCars = asyncHandler(async (req, res) => {
    const cars = await carService.getAllCars(req.query);
    res.status(200).json({
        success: true,
        count: cars.length,
        data: cars
    });
});

const getCarById = asyncHandler(async (req, res) => {
    const car = await carService.getCarById(req.params.id);
    
    if (!car) {
        return res.status(404).json({
            success: false,
            message: 'Car not found'
        });
    }

    res.status(200).json({
        success: true,
        data: car
    });
});

module.exports = {
    getAllCars,
    getCarById
};
