module.exports = (sequelize, DataTypes) => {
    const UserMeta = sequelize.define("user_meta", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // One-to-one
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return UserMeta;
};
