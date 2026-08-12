const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000, // 3s timeout instead of 30s
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Warning: Could not connect to ${process.env.MONGODB_URI} (${error.message}). Running with fallback data.`);
  }
};

module.exports = connectDB;
