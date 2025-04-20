/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validation = require("../middleware/validation.middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []  #
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - username
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 */
router.post("/register", validation.registerValidator, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT
 *     tags: [Auth]
 *     security: []  #
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validation.loginValidator, authController.login);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a new password on your registered email
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link sent
 *       404:
 *         description: Email not found
 */
router.post("/forgot-password", authController.forgotPassword);


module.exports = router;
