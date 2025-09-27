

const userService = require("../services/user.service");

const registerUser = async (req, res) => {
    console.log("register");
    const userData = req.body
    const user = await userService.createUser(userData);
    // res.send(user)
    res.status(201).json({
        status: "success",
        data: { user },
    });
}

const loginUser = async (req, res) => {
    const userData = req.body;
    const token = await userService.loginUser(userData);
    if (token)
        res.send("login successful")
    else
        res.send("Login failed")
}

const getProfile = async (req, res) => {
    const user = req.user
    console.log("controller:", user);
    res.send(`${user.username}'s profile`)
}

module.exports = { registerUser, loginUser, getProfile }