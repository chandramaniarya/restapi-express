const { body, validationResult } = require("express-validator");

exports.registerValidator = [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

exports.loginValidator = [
    body("email").isEmail(),
    body("password").exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];
