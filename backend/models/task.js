const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["todo", "progress", "completed"],
		default: "todo",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category", // Reference to the Category model
		required: true, // Each task must belong to a category
	},
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;
