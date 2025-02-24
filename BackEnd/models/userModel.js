const { db } = require("./db");
const { DataTypes } = require("sequelize")

const User = db.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {

});

module.exports = { User };