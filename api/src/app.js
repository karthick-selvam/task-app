const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const { authRouter } = require("./routes/auth/auth.router");
const { orgRouter } = require("./routes/org/org.router");
const { tasksRouter } = require("./routes/tasks/tasks.router");

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/users", authRouter);
app.use("/api/org", orgRouter);
app.use("/api/tasks", tasksRouter);

module.exports = app;
