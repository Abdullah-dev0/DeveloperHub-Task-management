// swaggerConfig.js
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Task API",
			version: "1.0.0",
			description: "API documentation for task management",
		},
		servers: [{ url: "http://localhost:3000" }],
	},
	apis: ["./routes/*.js"], // Location of your route files
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
