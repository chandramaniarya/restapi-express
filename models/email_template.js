const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const EmailTemplate = sequelize.define("emailtemplate", {
        template_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        template_subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        templateStatus: {
            type: DataTypes.INTEGER
        }
    });
    return EmailTemplate;
};
