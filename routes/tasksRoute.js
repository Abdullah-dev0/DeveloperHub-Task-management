const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/roleChecking.js");
const taskController = require("../controllers/taskController.js");

// Create a new task
router.post("/add-task", checkRole("createTask"), taskController.addTask);

// Get all tasks
router.get("/tasks", taskController.getAllTasks);

// Update task status
router.patch("/update-status/:id", taskController.updateTaskStatus);

// Delete a task
router.delete("/delete-task/:id", taskController.deleteTask);

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Create a new task
 *     description: Only accessible by admin users
 *     responses:
 *       200:
 *         description: Task created successfully
 *       403:
 *         description: Access forbidden: insufficient permissions
 */
router.post("/create", checkRole("createTask"), (req, res) => {
	res.json({ message: "Task created successfully" });
});

/**
 * @swagger
 * /tasks/view:
 *   get:
 *     summary: View all tasks
 *     description: Accessible by both admin and user roles
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get("/view", checkRole("viewTask"), (req, res) => {
	res.json({ message: "Tasks fetched successfully" });
});

module.exports = router;
