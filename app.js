const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://taskify-black-eta.vercel.app"  // Remove trailing slash
    ],
    credentials: true,
  })
);

app.use(express.json());

// API routes
const usersApi = require("./controllers/user");
const tasksApi = require("./controllers/task");
app.use("/api/v1", usersApi);
app.use("/api/v1", tasksApi);

// Serve static files from React build
app.use(express.static(path.resolve(__dirname, "client", "dist")));

// Catch-all handler for React routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

module.exports = app;
