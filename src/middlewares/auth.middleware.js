// const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/jwt")
const { getUserById } = require("../services/user.service");
const User = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Auth header", req.headers);


        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw "No token provided";

        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);
        console.log("decoded", decoded);

        const user = await User.findOne({ userId: decoded.userId }, { password: 0 })
        if (!user)
            throw "user doesn't exist for token provided"
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ status: "UNAUTHORIZED", message: `Couldn't access profile: ${err}` })
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            status: "FORBIDDEN",
            message: "Admins only",
        });
    }
    next();
};

module.exports = { authMiddleware, adminOnly };
