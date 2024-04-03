const http = require("http");
const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8000;
// MongoDB connection URI
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/org_management_db";

// HTTP INITIALIZATION
const httpServer = http.createServer(app);

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");

    // Start HTTP server after connecting to MongoDB
    httpServer.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process
  });
