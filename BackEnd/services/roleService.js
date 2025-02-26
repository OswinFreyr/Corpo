const { Role, Question, } = require("../models/associations");


async function createRole(role) {
    return await Role.create(role);
}

async function getRoleById(id) {
    const role = await Role.findByPk(id, {
        include: [
            {model: Question},
        ]
    });
    if (role) {
        return role.toJSON();
    }
    else {
        return null;
    }
}

async function getAllRoles(criterias = {}) {
    const where = {}
    if (criterias.role) {
        where.role = criterias.role;
    }
    const roles = await Role.findAll({
        where,
        include: [
            {model: Question},
        ]
    });
    if(roles) {
        return roles;
    }
    else {
        return null;
    }
}

async function getLimitedRoles(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.role) {
        where.role = criterias.role;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Role.findAndCountAll({
        where,
        include: [
            {model: Question},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        roles: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function updateRole(roleId, updatedData) {
    const role = await Role.findByPk(roleId);
    if (role) {
        return role.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteRole(roleId) {
    const role = await Role.findByPk(roleId);
    if (role) {
        return role.destroy();
    }
    else {
        return null;
    }
}

async function createAllRoles(roles, ) {
    try {

        const tabRoles = [];
        roles.forEach(async roleData => {
            tabRoles.push({
                role: roleData.role,
                link: roleData.link
            })
        });

        roles = await Role.bulkCreate(tabRoles, {ignoreDuplicates: true })
        
        console.log('Tous les roles ont été créés avec succès.');

    } catch (err) {
        console.error('Erreur lors de la création des roles :', err);
    }
}

module.exports = { createRole, getRoleById, getAllRoles, getLimitedRoles, updateRole, deleteRole, createAllRoles }