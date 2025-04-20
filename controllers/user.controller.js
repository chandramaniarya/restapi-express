const db = require("../models");


exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        if (parseInt(req.params.id) !== req.userId) {
            return res.status(403).json({status:403, message: "Access denied." });
        }

        const user = await db.user.findByPk(userId, {
            attributes: ["id", "username", "email","first_name","last_name"], // hide password
            include: {
                model: db.user_meta,
                as: "meta",
                attributes: ["profileImage", "address", "city", "country", "phone"],
            }
        });

        if (!user) {
            return res.status(404).json({status:404, message: "User not found." });
        }

        return res.status(200).json({status:200, user:user});
    } catch (err) {
        console.error(err);
        res.status(500).json({status:500, message: "Internal server error" });
    }
};
