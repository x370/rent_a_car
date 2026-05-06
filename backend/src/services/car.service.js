const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCars = async (filters = {}) => {
    const { brand, city, is_available } = filters;
    
    return await prisma.car.findMany({
        where: {
            ...(brand && { brand: { contains: brand, mode: 'insensitive' } }),
            ...(city && { city: { contains: city, mode: 'insensitive' } }),
            ...(is_available !== undefined && { is_available: is_available === 'true' })
        },
        include: {
            images: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

const getCarById = async (id) => {
    return await prisma.car.findUnique({
        where: { id: parseInt(id) },
        include: {
            images: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            reviews: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });
};

module.exports = {
    getAllCars,
    getCarById
};
