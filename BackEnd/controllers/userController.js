const userService = require("../services/userService");

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllUsers(req, res) {
    try{
        const { offset, limit, username, score } = req.query;
        const users = await userService.getAllUsers({ offset, limit, username, score });
        res.json(users);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedUsers(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, username, score } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await userService.getLimitedUsers({ offset, limit, username, score }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += username ? `&username=${username}` : "";
        queryParams += score ? `&score=${score}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.users, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateUser (req, res){
    try {
        const idUser = req.query.idUser;
        const user = await userService.updateUser(idUser, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteUser (req, res){
    try {
        const idUser = req.query.idUser;
        const user = await userService.deleteUser(idUser);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createUser, getAllUsers, getLimitedUsers, updateUser, deleteUser }