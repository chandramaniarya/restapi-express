const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        category_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        category_status: {
            type: INTEGER,
            allowNull: false,
            default:0
        },
        category_icon: {
            type: DataTypes.STRING
        }
    });
    return Category;
};
