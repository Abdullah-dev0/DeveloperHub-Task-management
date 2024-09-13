const express = require("express");
const Task = require("../models/task");
const router = express.Router();

// Create a new task
router.post("/add-task", async (req, res) => {
	try {
		const { title, description, status } = req.body;
		const newTask = new Task({ title, description, status });
		await newTask.save();
		res.status(200).send({ status: 200, message: "Task save successfully!" });
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
});

// get all task api
router.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({
			sort: { createdAt: 1 },
		});
		res.send(tasks.reverse());
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

// update task status api
router.patch("/update-status/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
		if (!task) {
			return res.status(404).send({ message: "Task not found" });
		}
		res.send({ status: 200 });
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
});

// Delete a task api
router.delete("/delete-task/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send({ message: "Task not found" });
		}
		res.send({ status: 200, message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
});

module.exports = router;
