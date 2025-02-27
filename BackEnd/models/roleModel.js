const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Role = db.define("roles", {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

});

module.exports = { Role };