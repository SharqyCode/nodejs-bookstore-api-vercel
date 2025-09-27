

const userService = require("../services/user.service");

const registerUser = async (req, res) => {
    console.log("register");
    const userData = req.body
    const user = await userService.createUser(userData);
    if (user.status === "OK")
        res.status(201).json(
            user
        );
    else
        res.status(400).json(
            user
        );
}

const loginUser = async (req, res) => {
    const userData = req.body;
    const token = await userService.loginUser(userData);
    console.log(token);
    if (token.status === "OK")
        res.status(200).json(token);
    else
        res.status(401).json(token);
}

const getProfile = async (req, res) => {
    const user = req.user
    console.log("controller:", user);
    res.status(200).json({
        status: "success",
        data: `${user.username}'s profile`
    });
}

module.exports = { registerUser, loginUser, getProfile }