const { db } = require("./db");
const { DataTypes } = require("sequelize")

const AnswerR = db.define("answersR", {
    answerR: {
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
    productivty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    environment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {

});

module.exports = { AnswerR };