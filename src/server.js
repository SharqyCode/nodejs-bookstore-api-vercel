require('dotenv').config({path:"../.env"});
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
/* console.log('Debug - Environment variables:');
console.log('PORT:', process.env.PORT);
console.log('ATLAS_URI:', process.env.ATLAS_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('---'); */

const PORT = config.port || 5000;
/* mongoose.connection.once("open", async () => {
  console.log("✅ Connected to MongoDB");
  console.log("Database:", mongoose.connection.name);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections:", collections.map(c => c.name));
}); */
// Connect to DB
mongoose.connect(process.env.ATLAS_URI, {
   family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
    .then(() => {
        console.log('Using connection string:', config.ATLAS_URI);
        console.log('✅ Connected to MongoDB');
        console.log("Connected to DB:", mongoose.connection.name);
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });
