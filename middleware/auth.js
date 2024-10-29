const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "Access denied" });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified; // Attach the userId to the request
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = authMiddleware;
