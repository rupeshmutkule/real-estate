const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("\nPossible solutions:");
    console.error("1. Check if your MongoDB Atlas cluster is active (not paused)");
    console.error("2. Check your internet connection");
    console.error("3. Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)");
    console.error("4. Wait a few moments and restart the server");
    process.exit(1);
  }
};

module.exports = connectDB;
