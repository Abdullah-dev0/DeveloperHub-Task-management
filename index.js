const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const taskRoute = require("./routes/tasksRoute");

const app = express();
app.use(
	cors({
		origin: "*",
	}),
);
app.use(express.json());

// connect with mongodb
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("Mongoose is connected");
});
const userRoute = require("./routes/userRoute");
app.use("/api", taskRoute);
app.use("/api/auth", userRoute);

app.get("/", (req, res) => {
	res.send("Task Manager Server is Running");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

exports.app = app;
