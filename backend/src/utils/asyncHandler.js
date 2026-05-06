/**
 * Wrapper for async controller functions to catch errors and pass them to the error middleware
 * @param {Function} fn 
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
