const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController.js");

// Create a new task
router.post("/add-task", taskController.addTask);

// Get all tasks
router.get("/tasks", taskController.getAllTasks);

// Update task status
router.patch("/update-status/:id", taskController.updateTaskStatus);

// Delete a task
router.delete("/delete-task/:id", taskController.deleteTask);

module.exports = router;
