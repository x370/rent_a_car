const authService = require('../services/auth.service');
const { createAuditLog } = require('../services/audit.service');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
    const user = await authService.createUser(req.body);
    
    await createAuditLog({
        req,
        user_id: user.id,
        action: 'REGISTER',
        resource: 'USER',
        resource_id: user.id,
        details: user
    });

    res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, name: user.name, email: user.email }
    });
});

const login = asyncHandler(async (req, res) => {
    const { user, token } = await authService.loginUser(req.body);

    await createAuditLog({
        req,
        user_id: user.id,
        action: 'LOGIN',
        resource: 'USER',
        resource_id: user.id,
        details: user
    });

    res.status(200).json({
        role: user.role,
        token
    });
});

module.exports = { register, login };
