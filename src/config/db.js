const mongoose = require("mongoose");

let isConnected; // track connection state across hot reloads/serverless calls

async function connectDB(uri) {
  if (isConnected) {
    // If already connected, reuse the connection
    console.log("=> Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("=> New MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = connectDB;
