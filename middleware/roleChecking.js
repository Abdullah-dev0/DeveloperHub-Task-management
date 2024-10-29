// authMiddleware.js
const roles = require("../libs/roles");

const checkRole = (requiredPermission) => {
	return (req, res, next) => {
		const userRole = req.user.role; // Assuming `req.user.role` is populated after authentication
		const rolePermissions = roles[userRole];

		if (rolePermissions && rolePermissions.includes(requiredPermission)) {
			return next();
		}
		return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
	};
};

module.exports = checkRole;
