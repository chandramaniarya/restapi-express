const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // make sure this folder exists
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, filename);
    }
});
  
const upload = multer({ storage });

/**
 * @swagger
 * /category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []   # <-- use this if authMiddleware checks JWT/Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - category_name
 *             properties:
 *               category_name:
 *                 type: string
 *               parent_id:
 *                 type: number
 *               category_icon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/create-category", authMiddleware, upload.single('category_icon'), categoryController.createCategory);


/**
 * @swagger
 * /category/category-list:
 *   get:
 *     summary: Fetch a list of categories along with their subcategories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Categories fetched successfully with their subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Categories fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       category_name:
 *                         type: string
 *                       parent_id:
 *                         type: integer
 *                       category_icon:
 *                         type: string
 *                       subcategories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             category_name:
 *                               type: string
 *                             parent_id:
 *                               type: integer
 *                             category_icon:
 *                               type: string
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized
 */
router.get("/category-list", authMiddleware, categoryController.categoryList);

module.exports = router;
