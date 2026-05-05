const authService = require('../services/auth.service');
const register = async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        const statusCode = error.message.includes('exists') ? 400 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};

module.exports = { register };
