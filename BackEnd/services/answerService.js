const { Answer, Bonus, Reason, } = require("../models/associations");


async function createAnswer(answer) {
    return await Answer.create(answer);
}

async function getAnswerById(id) {
    const answer = await Answer.findByPk(id, {
        include: [
            {model: Reason},
            // {model: Bonus},
        ]
    });
    if (answer) {
        return answer.toJSON();
    }
    else {
        return null;
    }
}

async function getAllAnswers(criterias = {}) {
    const where = {}
    if (criterias.answer) {
        where.answer = criterias.answer;
    }
    const answers = await Answer.findAll({
        where,
        include: [
            {model: Reason},
            // {model: Bonus},
        ]
    });
    if(answers) {
        return answers;
    }
    else {
        return null;
    }
}

async function getLimitedAnswers(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.answer) {
        where.answer = criterias.answer;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Answer.findAndCountAll({
        where,
        include: [
            {model: Reason},
            // {model: Bonus},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        answers: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateAnswer(answerId, updatedData) {
    const answer = await Answer.findByPk(answerId);
    if (answer) {
        return answer.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteAnswer(answerId) {
    const answer = await Answer.findByPk(answerId);
    if (answer) {
        return answer.destroy();
    }
    else {
        return null;
    }
}

async function createAllAnswers(answers, ) {
    try {

        const tabAnswers = [];
        answers.forEach(async answerData => {

            tabAnswers.push({
                answer: answerData.answer,
                wellbeing: answerData.wellbeing,
                treasury: answerData.treasury,
                productivity: answerData.productivity,
                environment: answerData.environment,
                reasonId: answerData.reasonId,
                questionId: answerData.questionId,
            })
        });

        answers = await Answer.bulkCreate(tabAnswers, {ignoreDuplicates: true })
        
        console.log('Tous les reponses ont été créés avec succès.');

    } catch (err) {
        console.error('Erreur lors de la création des reponses :', err);
    }
}

module.exports = { createAnswer, getAnswerById, getAllAnswers, getLimitedAnswers, updateAnswer, deleteAnswer, createAllAnswers }