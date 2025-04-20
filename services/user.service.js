const db = require("../models");
const bcrypt = require("bcryptjs");

exports.createUser = async ({ first_name,last_name,username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.user.create({ first_name, last_name, username, email, password: hashedPassword,user_status:1 });
};

exports.findByEmail = async (email) => {
    return db.user.findOne({ where: { email } });
};
