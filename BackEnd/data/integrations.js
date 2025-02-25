const fs = require('fs');
const { createAllAnswers } = require('../services/answerService');
const { createAllReasons } = require('../services/reasonService');
const { createAllRoles } = require('../services/roleService');
const { createAllQuestions } = require('../services/questionService');
const { createAllUsers } = require('../services/userService');


async function runInit() {
    let reasonsData = fs.readFileSync('./data/reasons.json', 'utf8');
    let reasons = JSON.parse(reasonsData);
    let rolesData = fs.readFileSync('./data/roles.json', 'utf8');
    let roles = JSON.parse(rolesData);
    let questionsData = fs.readFileSync('./data/questions.json', 'utf8');
    let questions = JSON.parse(questionsData);
    let usersData = fs.readFileSync('./data/users.json', 'utf8');
    let users = JSON.parse(usersData);
    let answersData = fs.readFileSync('./data/answers.json', 'utf8');
    let answers = JSON.parse(answersData);

    reasons = await createAllReasons(reasons);
    reasonsData = null;
    roles = await createAllRoles(roles);
    rolesData = null;
    questions = await createAllQuestions(questions);
    questionsData = null;
    users = await createAllUsers(users);
    usersData = null;
    answers = await createAllAnswers(answers);
    answersData = null;
}

module.exports = { runInit }
