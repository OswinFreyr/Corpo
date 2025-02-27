const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Reason = db.define("reasons", {
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

});

module.exports = { Reason };