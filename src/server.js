require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

const PORT = config.port || 3000;

// Connect to DB
mongoose.connect(config.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ Connected to MongoDB');
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });
