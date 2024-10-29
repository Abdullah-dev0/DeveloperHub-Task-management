const express = require("express");
const userRouter = express.Router();
const { signup, login, getUser } = require("../controllers/user");

userRouter.post("/register", signup);
userRouter.post("/login", login);
userRouter.get("/getuser", getUser);

module.exports = userRouter;
