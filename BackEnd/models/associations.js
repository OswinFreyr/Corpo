const { AnswerL } = require("./answerLModel");
const { AnswerR } = require("./answerRModel");
const { Bonus } = require("./bonusModel");
const { Question } = require("./questionModel");
const { Reason } = require("./reasonModel");
const { Role } = require("./roleModel");
const { User } = require("./userModel");



Reason.hasMany(User);
User.belongsTo(Reason);


module.exports = { User, Question, AnswerL, AnswerR, Role, Reason, Bonus };
