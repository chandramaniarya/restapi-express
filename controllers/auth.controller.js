const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/user.service");
const db = require("../models");
require("dotenv").config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if email already exists
        const existingEmail = await db.user.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({status:400, message: "Email is already in use." });
        }

        // Check if username already exists
        const existingUsername = await db.user.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({status:400, message: "Username is already taken." });
        }

        
        const user = await userService.createUser(req.body);
        res.status(201).json({status:201, message: "User created successfully", userId: user.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.findByEmail(req.body.email);
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await db.user.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ status:404, message: "User with this email not found." });
        }

        // Create a reset token that expires in 15 minutes
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Save the token and expiry to DB (optional)
        user.resetToken = token;
        user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        // Simulate sending email
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        console.log("Reset link:", resetLink);

        res.status(200).json({ status:200, message: "Password reset link has been sent (simulated)." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status:500, message: "Server error" });
    }
};

