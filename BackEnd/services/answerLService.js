const { AnswerL, Bonus, } = require("../models/associations");


async function createAnswerL(answerL) {
    return await AnswerL.create(answerL);
}

async function getAnswerLById(id) {
    const answerL = await AnswerL.findByPk(id, {
        include: [
            // {model: Bonus},
        ]
    });
    if (answerL) {
        return answerL.toJSON();
    }
    else {
        return null;
    }
}

async function getAllAnswerLs(criterias = {}) {
    const where = {}
    if (criterias.answerL) {
        where.answerL = criterias.answerL;
    }
    const answerLs = await AnswerL.findAll({
        where,
        include: [
            // {model: Bonus},
        ]
    });
    if(answerLs) {
        return answerLs;
    }
    else {
        return null;
    }
}

async function getLimitedAnswerLs(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.answerL) {
        where.answerL = criterias.answerL;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await AnswerL.findAndCountAll({
        where,
        include: [
            // {model: Bonus},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        answerLs: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateAnswerL(answerLId, updatedData) {
    const answerL = await AnswerL.findByPk(answerLId);
    if (answerL) {
        return answerL.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteAnswerL(answerLId) {
    const answerL = await AnswerL.findByPk(answerLId);
    if (answerL) {
        return answerL.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createAnswerL, getAnswerLById, getAllAnswerLs, getLimitedAnswerLs, updateAnswerL, deleteAnswerL }