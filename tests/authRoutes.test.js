import mongoose from "mongoose";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import app from "../index";

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

describe("User Authentication API", () => {
	it("should register a new user", async () => {
		const response = await request(app).post("/api/auth/register").send({
			username: "testuser32",
			email: "testuser@example2.com", // Same email as before
			password: "password789",
		});

		expect(response.status).toBe(201);
		expect(response.body.message).toBe("User registered successfully");
		expect(response.body.user.email).toBe("testuser@example2.com");
	});

	it("should not register a user with an existing email", async () => {
		const response = await request(app).post("/api/auth/register").send({
			username: "testuser3",
			email: "testuser@example1.com", // Same email as before
			password: "password789",
		});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("User already exists");
	});

	it("should login an existing user and return a JWT token", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "testuser@example1.com", // Same email as before
			password: "password789",
		});

		expect(response.status).toBe(200);
		expect(response.body.token).toBeDefined(); // Check if token is returned
	});

	it("should not login with wrong credentials", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "testuser@example.com",
			password: "wrongpassword", // Incorrect password
		});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid credentials");
	});
});
