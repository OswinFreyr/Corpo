const { Question, Role, AnswerL, AnswerR, } = require("../models/associations");


async function createQuestion(question) {
    return await Question.create(question);
}

async function getQuestionById(id) {
    const question = await Question.findByPk(id, {
        include: [
            {model: Role},
            {model: AnswerL},
            {model: AnswerR},
        ]
    });
    if (question) {
        return question.toJSON();
    }
    else {
        return null;
    }
}

async function getAllQuestions(criterias = {}) {
    const where = {}
    if (criterias.question) {
        where.question = criterias.question;
    }
    const questions = await Question.findAll({
        where,
        include: [
            {model: Role},
            {model: AnswerL},
            {model: AnswerR},
        ]
    });
    if(questions) {
        return questions;
    }
    else {
        return null;
    }
}

async function getLimitedQuestions(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.question) {
        where.question = criterias.question;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Question.findAndCountAll({
        where,
        include: [
            {model: Role},
            {model: AnswerL},
            {model: AnswerR},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        questions: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateQuestion(questionId, updatedData) {
    const question = await Question.findByPk(questionId);
    if (question) {
        return question.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteQuestion(questionId) {
    const question = await Question.findByPk(questionId);
    if (question) {
        return question.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createQuestion, getQuestionById, getAllQuestions, getLimitedQuestions, updateQuestion, deleteQuestion }