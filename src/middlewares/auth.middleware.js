// const jwt = require("jsonwebtoken");
const {verifyToken} = require("../config/jwt")
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

        const decoded = verifyToken(token);
        const user = await User.findOne({ userId: decoded.id }, { password: 0 })
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ status: "UNAUTHORIZED", message: `Couldn't access profile: ${err}` })
    }
};

module.exports = authMiddleware;
