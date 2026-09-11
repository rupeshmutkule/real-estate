require("dotenv").config();

const dns = require("dns");

// Use public DNS for MongoDB Atlas SRV resolution
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Debug: Check if MONGO_URI is loaded
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log(
  "MONGO_URI:",
  process.env.MONGO_URI
    ? process.env.MONGO_URI.replace(/:\/\/.*?:.*?@/, "://USER:PASSWORD@")
    : "NOT FOUND"
);

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
