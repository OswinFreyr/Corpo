const roleService = require("../services/roleService");

async function createRole(req, res) {
    try {
        const role = await roleService.createRole(req.body);
        res.json(role);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getRoleById(req, res) {
    try {
        const id = req.query.id;
        const role = await roleService.getRoleById(id);
        if(role){
            res.json(role);
        }
        else {
            res.json({"error": `Role ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllRoles(req, res) {
    try{
        const { offset, limit, role, } = req.query;
        const roles = await roleService.getAllRoles({ offset, limit, role, });
        res.json(roles);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedRoles(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, role, } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await roleService.getLimitedRoles({ offset, limit, role, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += role ? `&role=${role}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.roles, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateRole (req, res){
    try {
        const idRole = req.query.idRole;
        const role = await roleService.updateRole(idRole, req.body);
        res.json(role);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteRole (req, res){
    try {
        const idRole = req.query.idRole;
        const role = await roleService.deleteRole(idRole);
        res.json(role);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createRole, getRoleById, getAllRoles, getLimitedRoles, updateRole, deleteRole }