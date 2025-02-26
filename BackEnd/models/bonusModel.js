const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Bonus = db.define("bonus", {
    bonus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {

});

module.exports = { Bonus };