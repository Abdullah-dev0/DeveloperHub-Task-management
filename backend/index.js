const express = require("express");
const mongoose = require("mongoose");
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

app.use("/", taskRoute);

app.get("/", (req, res) => {
	res.send("Task Manager Server is Running");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
