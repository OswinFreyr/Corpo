const { Reason, Bonus, } = require("../models/associations");


async function createReason(answerR) {
    return await Reason.create(answerR);
}

async function getReasonById(id) {
    const answerR = await Reason.findByPk(id, {
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

async function getAllReasons(criterias = {}) {
    const where = {}
    if (criterias.reason) {
        where.reason = criterias.reason;
    }
    const answerRs = await Reason.findAll({
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

async function getLimitedReasons(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.reason) {
        where.reason = criterias.reason;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Reason.findAndCountAll({
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

async function updateReason(answerRId, updatedData) {
    const answerR = await Reason.findByPk(answerRId);
    if (answerR) {
        return answerR.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteReason(answerRId) {
    const answerR = await Reason.findByPk(answerRId);
    if (answerR) {
        return answerR.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createReason, getReasonById, getAllReasons, getLimitedReasons, updateReason, deleteReason }