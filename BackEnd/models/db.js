const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: '../database/bookshelf.sqlite',
  logging: false
});

module.exports = { db };