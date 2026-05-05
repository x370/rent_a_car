require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db.config');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // 1. Connect to Database
        await connectDB();

        // 2. Start Express Server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
