const { prisma } = require('../config/db.config');

/**
 * Generic Audit Logging Function
 * @param {Object} params
 */
const createAuditLog = async ({ req, user_id, action, resource, resource_id, details }) => {
    try {
        await prisma.auditLog.create({
            data: {
                user_id: user_id || (req?.user?.id),
                action,
                resource,
                resource_id: resource_id ? String(resource_id) : null,
                details: details || {},
                ip_address: req?.ip || 'unknown'
            }
        });
    } catch (error) {
        console.error('Audit Log Error:', error.message);
    }
};

module.exports = { createAuditLog };
