const { AnswerL } = require("./answerLModel");
const { AnswerR } = require("./answerRModel");
const { Bonus } = require("./bonusModel");
const { Question } = require("./questionModel");
const { Reason } = require("./reasonModel");
const { Role } = require("./roleModel");
const { User } = require("./userModel");


Reason.hasMany(User);
User.belongsTo(Reason);

Question.hasMany(AnswerL);
AnswerL.belongsTo(Question);

Question.hasMany(AnswerR);
AnswerR.belongsTo(Question);

Role.hasMany(Question);
Question.belongsTo(Role);

Bonus.hasMany(AnswerL);
AnswerL.belongsTo(Bonus);

Bonus.hasMany(AnswerR);
AnswerR.belongsTo(Bonus);


module.exports = { User, Question, AnswerL, AnswerR, Role, Reason, Bonus };
