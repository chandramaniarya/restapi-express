const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_status: {
            type: INTEGER,
            allowNull: false,
            default:0
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetTokenExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    return User;
};
