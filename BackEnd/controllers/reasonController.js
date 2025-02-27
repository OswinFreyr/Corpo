const reasonService = require("../services/reasonService");

async function createReason(req, res) {
    try {
        const reason = await reasonService.createReason(req.body);
        res.json(reason);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getReasonById(req, res) {
    try {
        const id = req.query.id;
        const reason = await reasonService.getReasonById(id);
        if(reason){
            res.json(reason);
        }
        else {
            res.json({"error": `Reason ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllReasons(req, res) {
    try{
        const { offset, limit, reason, } = req.query;
        const reasons = await reasonService.getAllReasons({ offset, limit, reason, });
        res.json(reasons);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedReasons(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, reason, } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await reasonService.getLimitedReasons({ offset, limit, reason, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += reason ? `&reason=${reason}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.reasons, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateReason (req, res){
    try {
        const idReason = req.query.idReason;
        const reason = await reasonService.updateReason(idReason, req.body);
        res.json(reason);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteReason (req, res){
    try {
        const idReason = req.query.idReason;
        const reason = await reasonService.deleteReason(idReason);
        res.json(reason);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createReason, getReasonById, getAllReasons, getLimitedReasons, updateReason, deleteReason }