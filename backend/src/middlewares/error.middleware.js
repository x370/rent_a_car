/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific common errors
    if (err.message.includes('exists')) statusCode = 400;
    if (err.message.includes('Invalid')) statusCode = 401;

    console.error(`[Error] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;
