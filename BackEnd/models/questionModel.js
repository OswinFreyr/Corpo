const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Question = db.define("questions", {
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

});

module.exports = { Question };