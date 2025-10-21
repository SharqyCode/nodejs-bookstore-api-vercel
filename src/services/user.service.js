const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { v4: uuidV4 } = require("uuid")
const { signToken, verifyToken } = require("../config/jwt");


// 🔹 Helper to generate a JWT
function generateToken(user) {
    return signToken(user);
}


const createUser = async (userData) => {
    const { email, password } = userData;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already registered");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...userData,
            password: hashedPassword,
            userId: uuidV4()
        });
        await user.save()
        const userObj = user.toObject();
        delete userObj.password;
        return { status: "CREATED", message: "User Registered successfully", data: userObj }

    } catch (err) {
        return { status: "BAD REQUEST", message: `Couldn't register user: ${err.message}` };
    }
};


const loginUser = async (userData) => {
    const { username, password } = userData
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("user doesn't exist");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            throw new Error("password is incorrect")
        }
        console.log("user object before token:", user);
        const token = generateToken({ userId: user.userId, role: user.role });
        console.log("verify token", verifyToken(token));

        return { status: "OK", message: `Login successful`, token }
    } catch (err) {
        return { status: "UNAUTHORIZED", message: `Couldn't login user: ${err.message}`, token: null }

    }
};


const getUserById = async (id) => {
    const user = await User.findOne({ userId: id });
    console.log(id, user);

    return user;
};

module.exports = { createUser, loginUser, getUserById }