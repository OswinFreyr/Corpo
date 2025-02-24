const answerLService = require("../services/answerLService");

async function createAnswerL(req, res) {
    try {
        const answerL = await answerLService.createAnswerL(req.body);
        res.json(answerL);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAnswerLById(req, res) {
    try {
        const id = req.query.id;
        const answerL = await answerLService.getAnswerLById(id);
        if(answerL){
            res.json(answerL);
        }
        else {
            res.json({"error": `AnswerL ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllAnswerLs(req, res) {
    try{
        const { offset, limit, answerL, } = req.query;
        const answerLs = await answerLService.getAllAnswerLs({ offset, limit, answerL, });
        res.json(answerLs);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedAnswerLs(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, answerL, } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await answerLService.getLimitedAnswerLs({ offset, limit, answerL, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += answerL ? `&answerL=${answerL}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.answerLs, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateAnswerL (req, res){
    try {
        const idAnswerL = req.query.idAnswerL;
        const answerL = await answerLService.updateAnswerL(idAnswerL, req.body);
        res.json(answerL);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteAnswerL (req, res){
    try {
        const idAnswerL = req.query.idAnswerL;
        const answerL = await answerLService.deleteAnswerL(idAnswerL);
        res.json(answerL);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createAnswerL, getAnswerLById, getAllAnswerLs, getLimitedAnswerLs, updateAnswerL, deleteAnswerL }