const jwt = require("jsonwebtoken");
const config = require("../config");
const { getUserById } = require("../services/user.service");
const User = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("No token provided");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.jwt.secret);
        console.log("decoded:", decoded);
        const user = await User.findOne({ userId: decoded.id }, { password: 0 })
        // console.log(user);

        req.user = user;
        next();
    } catch (err) {
        res.send(`Couldn't access profile: ${err}`)
    }
};

module.exports = authMiddleware;
