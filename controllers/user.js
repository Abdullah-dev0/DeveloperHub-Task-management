const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../libs/validation.js");
const User = require("../models/user.js");
require("dotenv").config();

const signup = async (req, res) => {
	try {
		const validation = signupSchema.safeParse(req.body);
		if (!validation.success) {
			return res.status(400).json({ errors: validation.error.errors });
		}

		const { username, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		// Send response as per the test case
		res.status(201).json({
			message: "User registered successfully", // Add message
			user: {
				email: newUser.email, // Include the user object with the email
			},
		});
	} catch (error) {
		console.error("Signup error:", error); // Log the error
		res.status(500).json({ error: "Server error" });
	}
};

const login = async (req, res) => {
	try {
		// Validate the input using Zod
		const validation = loginSchema.safeParse(req.body);

		// if (!validation.success) {
		// 	return res.status(400).json({ errors: validation.error.errors });
		// }

		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({
			email,
		});

		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Generate JWT
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ token });
	} catch (error) {
		console.log("Login error:", error); // Log the error
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = { signup, login, getUser };
