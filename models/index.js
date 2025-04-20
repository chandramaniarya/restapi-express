const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: dbConfig.pool,
    logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.user_meta = require("./user_meta.model.js")(sequelize, Sequelize);

// One-to-One using user_id as the foreign key
db.user.hasOne(db.user_meta, {
    foreignKey: "userId",
    as: "meta",
    onDelete: "CASCADE",
});

db.user_meta.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});
module.exports = db;
