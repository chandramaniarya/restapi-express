const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User info retrieved
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, userController.getUserById);

module.exports = router;
