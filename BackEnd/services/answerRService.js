const { AnswerR, Bonus, } = require("../models/associations");


async function createAnswerR(answerR) {
    return await AnswerR.create(answerR);
}

async function getAnswerRById(id) {
    const answerR = await AnswerR.findByPk(id, {
        include: [
            // {model: Bonus},
        ]
    });
    if (answerR) {
        return answerR.toJSON();
    }
    else {
        return null;
    }
}

async function getAllAnswerRs(criterias = {}) {
    const where = {}
    if (criterias.answerR) {
        where.answerR = criterias.answerR;
    }
    const answerRs = await AnswerR.findAll({
        where,
        include: [
            // {model: Bonus},
        ]
    });
    if(answerRs) {
        return answerRs;
    }
    else {
        return null;
    }
}

async function getLimitedAnswerRs(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.answerR) {
        where.answerR = criterias.answerR;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await AnswerR.findAndCountAll({
        where,
        include: [
            // {model: Bonus},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        answerRs: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateAnswerR(answerRId, updatedData) {
    const answerR = await AnswerR.findByPk(answerRId);
    if (answerR) {
        return answerR.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteAnswerR(answerRId) {
    const answerR = await AnswerR.findByPk(answerRId);
    if (answerR) {
        return answerR.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createAnswerR, getAnswerRById, getAllAnswerRs, getLimitedAnswerRs, updateAnswerR, deleteAnswerR }