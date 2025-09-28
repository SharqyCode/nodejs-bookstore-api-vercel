const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controller");
// optionally: const validate = require("../middlewares/validate.middleware");
// optionally: const { registerSchema, loginSchema } = require("../validators/auth.validator");


userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

const authMiddleware = require("../middlewares/auth.middleware");
userRouter.get("/me", authMiddleware, userController.getProfile);

module.exports = userRouter;
