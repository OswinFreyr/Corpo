const { Reason, Answer, } = require("../models/associations");


async function createReason(reason) {
    return await Reason.create(reason);
}

async function getReasonById(id) {
    const reason = await Reason.findByPk(id, {
        include: [
            {model: Answer},
        ]
    });
    if (reason) {
        return reason.toJSON();
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
    const reasons = await Reason.findAll({
        where,
        include: [
            {model: Answer},
        ]
    });
    if(reasons) {
        return reasons;
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
            {model: Answer},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        reasons: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateReason(reasonId, updatedData) {
    const reason = await Reason.findByPk(reasonId);
    if (reason) {
        return reason.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteReason(reasonId) {
    const reason = await Reason.findByPk(reasonId);
    if (reason) {
        return reason.destroy();
    }
    else {
        return null;
    }
}

async function createAllReasons(reasons, ) {
    try {

        const tabReasons = [];
        reasons.forEach(async reasonData => {
            tabReasons.push({
                reason: reasonData.reason,
            })
        });

        reasons = await Reason.bulkCreate(tabReasons, {ignoreDuplicates: true })
        
        console.log('Tous les raisons ont été créés avec succès.');

    } catch (err) {
        console.error('Erreur lors de la création des raisons :', err);
    }
}

module.exports = { createReason, getReasonById, getAllReasons, getLimitedReasons, updateReason, deleteReason, createAllReasons, }