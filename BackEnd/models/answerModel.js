const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Answer = db.define("answers", {
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wellbeing: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    treasury: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productivity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    environment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {

});

module.exports = { Answer };