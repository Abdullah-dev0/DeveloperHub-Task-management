const Task = require("../models/task");
const Category = require("../models/category");

// Create a new task
const addTask = async (req, res) => {
	try {
		const { title, description, status, categoryId } = req.body;

		// Find the category by ID
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).send({ message: "Category not found" });
		}

		// Create a new task with the associated category
		const newTask = new Task({ title, description, status, category: category._id });
		await newTask.save();

		res.status(200).send({
			status: 200,
			message: "Task created successfully with category",
			task: newTask,
		});
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
};

// Fetch tasks with their associated categories
const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find().populate("category", "name description");
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
};
// Update task status
const updateTaskStatus = async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });

		if (!task) {
			return res.status(404).send({
				status: 404,
				message: "Task not found",
			});
		}

		res.status(200).send({
			status: 200,
			message: "Task status updated successfully",
		});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: "Internal server error",
		});
	}
};

// Delete a task
const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) {
			return res.status(404).send({
				status: 404,
				message: "Task not found",
			});
		}

		res.status(200).send({
			status: 200,
			message: "Task deleted successfully",
		});
	} catch (error) {
		res.status(500).send({
			status: 500,
			message: "Internal server error",
		});
	}
};

module.exports = {
	addTask,
	getAllTasks,
	updateTaskStatus,
	deleteTask,
};
