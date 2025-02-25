const { User, Reason, } = require("../models/associations");


async function createUser(user) {
    return await User.create(user);
}

async function getAllUsers(criterias = {}) {
    const where = {}
    if (criterias.username) {
        where.username = criterias.username;
    }
    if (criterias.score) {
        where.score = criterias.score;
    }
    const users = await User.findAll({
        where,
        include: [
            {model: Reason},
        ]
    });
    if(users) {
        return users;
    }
    else {
        return null;
    }
}

async function getLimitedUsers(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.username) {
        where.username = criterias.username;
    }
    if (criterias.score) {
        where.score = criterias.score;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await User.findAndCountAll({
        where,
        include: [
            {model: Reason},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        users: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateUser(userId, updatedData) {
    const user = await User.findByPk(userId);
    if (user) {
        return user.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (user) {
        return user.destroy();
    }
    else {
        return null;
    }
}

async function createAllUsers(users, ) {
    try {

        const tabUsers = [];
        users.forEach(async userData => {
            tabUsers.push({
                username: userData.username,
                score: userData.score,
                reasonId: userData.reasonId
            })
        });

        users = await User.bulkCreate(tabUsers, {ignoreDuplicates: true })
        
        console.log('Tous les users ont été créés avec succès.');

    } catch (err) {
        console.error('Erreur lors de la création des users :', err);
    }
}

module.exports = { createUser, getAllUsers, getLimitedUsers, updateUser, deleteUser, createAllUsers }