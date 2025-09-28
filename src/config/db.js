const mongoose = require("mongoose");
const config = require("./index");

const connectDB = async () => {
  try {
    await mongoose.connect(config.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    return Promise.resolve("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
