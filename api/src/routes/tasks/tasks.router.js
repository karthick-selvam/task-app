const express = require("express");
const tasksRouter = express.Router();
const passport = require("../../services/passport");
const taskController = require("./tasks.controller");

const authenticate = passport.authenticate("jwt", { session: false });

// GET all tasks
tasksRouter.get("/", authenticate, taskController.getAllTasks);

// GET a specific task by ID
tasksRouter.get("/:id", authenticate, taskController.getTaskById);

// POST create a new task
tasksRouter.post("/", authenticate, taskController.createTask);

// PUT update a task by ID
tasksRouter.put("/:id", authenticate, taskController.updateTask);

// DELETE delete a task by ID
tasksRouter.delete("/:id", authenticate, taskController.deleteTask);

module.exports = { tasksRouter };
