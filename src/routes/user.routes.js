const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controller");


userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

const { authMiddleware } = require("../middlewares/auth.middleware");
userRouter.get("/me", authMiddleware, userController.getProfile);

module.exports = userRouter;
