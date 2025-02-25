const { Answer } = require("./answerModel");
const { Bonus } = require("./bonusModel");
const { Question } = require("./questionModel");
const { Reason } = require("./reasonModel");
const { Role } = require("./roleModel");
const { User } = require("./userModel");


Reason.hasMany(User);
User.belongsTo(Reason);

Question.hasMany(Answer);
Answer.belongsTo(Question);

Role.hasMany(Question);
Question.belongsTo(Role);

Reason.hasMany(Answer);
Answer.belongsTo(Reason);

//Pas utilisé
Bonus.hasMany(Answer);
Answer.belongsTo(Bonus);


module.exports = { User, Question, Answer, Role, Reason, Bonus };
