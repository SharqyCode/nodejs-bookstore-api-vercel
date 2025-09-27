const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { v4: uuidV4 } = require("uuid")
const config = require("../config");


// 🔹 Helper to generate a JWT
function generateToken(userId) {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
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
        const userObj = { ...userData };
        delete userObj.password;
        return userObj;
    } catch (err) {
        return `Couldn't register user: ${err}\n`
    }
};


const loginUser = async (userData) => {
    const { email, password } = userData
    try {
        const user = await User.findOne({ email });
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

        return token;
    } catch (err) {
        return `Couldn't login user: ${err}`
    }
};


const getUserById = async (id) => {
    const user = await User.findOne({ userId: id });
    console.log(id, user);

    return user;
};

module.exports = { createUser, loginUser, getUserById }