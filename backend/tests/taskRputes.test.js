import mongoose from "mongoose";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it,beforeEach } from "vitest";
import app from "../index";
import Category from "../models/category";
import Task from "../models/task";

beforeAll(async () => {
	// Connect to the test database
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Connected to the test database.");
	} catch (error) {
		console.error("Database connection error:", error);
	}
});

afterAll(async () => {
	// Close the database connection and stop the server
	await mongoose.disconnect(); // Disconnect Mongoose
});

const createCategory = async (name = "Test Category", description = "Test Description") => {
	const category = new Category({ name, description });
	await category.save();
	return category;
};

describe("Task API", () => {
	// Clear the database before each test
	beforeEach(async () => {
		await Task.deleteMany({});
		await Category.deleteMany({});
	});

	// Create a new task
	it("should create a new task", async () => {
		const category = await createCategory();

		const response = await request(app).post("/api/tasks").send({
			title: "Test Task",
			description: "This is a test task",
			status: "pending",
			categoryId: category._id,
		});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Task created successfully with category");
		expect(response.body.task.title).toBe("Test Task");
		expect(response.body.task.category.toString()).toBe(category._id.toString());
	});

	// Fetch all tasks
	it("should fetch all tasks with their associated categories", async () => {
		const category = await createCategory();
		const task = new Task({
			title: "Test Task",
			description: "This is a test task",
			status: "pending",
			category: category._id,
		});
		await task.save();

		const response = await request(app).get("/api/tasks");

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0].title).toBe("Test Task");
		expect(response.body[0].category.name).toBe("Test Category");
	});

	// Update task status
	it("should update the status of an existing task", async () => {
		const category = await createCategory();
		const task = new Task({
			title: "Test Task",
			description: "This is a test task",
			status: "pending",
			category: category._id,
		});
		await task.save();

		const response = await request(app).patch(`/api/tasks/${task._id}`).send({ status: "completed" });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Task status updated successfully");

		// Fetch the updated task to verify the status change
		const updatedTask = await Task.findById(task._id);
		expect(updatedTask.status).toBe("completed");
	});

	// Delete a task
	it("should delete an existing task", async () => {
		const category = await createCategory();
		const task = new Task({
			title: "Test Task",
			description: "This is a test task",
			status: "pending",
			category: category._id,
		});
		await task.save();

		const response = await request(app).delete(`/api/tasks/${task._id}`);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Task deleted successfully");

		// Verify the task has been deleted
		const deletedTask = await Task.findById(task._id);
		expect(deletedTask).toBeNull();
	});

	// Handle not found error for updating a non-existent task
	it("should return 404 when updating a non-existent task", async () => {
		const response = await request(app)
			.patch("/api/tasks/60c72b2f5f1b2c001c8f45e3") // Invalid ID
			.send({ status: "completed" });

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Task not found");
	});

	// Handle not found error for deleting a non-existent task
	it("should return 404 when deleting a non-existent task", async () => {
		const response = await request(app).delete("/api/tasks/60c72b2f5f1b2c001c8f45e3"); // Invalid ID

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Task not found");
	});
});
