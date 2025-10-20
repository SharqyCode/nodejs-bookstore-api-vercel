const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { v4: uuidV4 } = require("uuid")
const { signToken } = require("../config/jwt");


// 🔹 Helper to generate a JWT
function generateToken(userId) {
    return signToken({ id: userId });
}


const createUser = async (userData) => {
    const { email, password } = userData;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already registered");
        }
        let origPass = password;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...userData,
            password: hashedPassword,
            userId: uuidV4()
        });
        await user.save()
        const userObj = { ...userData, origPass };
        delete userObj.password;
        return { status: "CREATED", message: "User Registered successfully", data: userObj }

    } catch (err) {
        return { status: "BAD REQUEST", message: `Couldn't register user: ${err}` }
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
        const token = generateToken(user.userId);
        console.log(token);

        return { status: "OK", message: `Login successful`, token }
    } catch (err) {
        return { status: "UNAUTHORIZED", message: `Couldn't login user: ${err}` }
    }
};


const getUserById = async (id) => {
    const user = await User.findOne({ userId: id });
    console.log(id, user);

    return user;
};

const getAllUsers = async () => {
    const users = await User.find();
    // console.log(id, user);

    return users;
};

module.exports = { createUser, loginUser, getUserById, getAllUsers }