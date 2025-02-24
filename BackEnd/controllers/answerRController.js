const answerRService = require("../services/answerRService");

async function createAnswerR(req, res) {
    try {
        const answerR = await answerRService.createAnswerR(req.body);
        res.json(answerR);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAnswerRById(req, res) {
    try {
        const id = req.query.id;
        const answerR = await answerRService.getAnswerRById(id);
        if(answerR){
            res.json(answerR);
        }
        else {
            res.json({"error": `AnswerR ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllAnswerRs(req, res) {
    try{
        const { offset, limit, answerR, } = req.query;
        const answerRs = await answerRService.getAllAnswerRs({ offset, limit, answerR, });
        res.json(answerRs);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedAnswerRs(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, answerR, } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await answerRService.getLimitedAnswerRs({ offset, limit, answerR, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += answerR ? `&answerR=${answerR}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.answerRs, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateAnswerR (req, res){
    try {
        const idAnswerR = req.query.idAnswerR;
        const answerR = await answerRService.updateAnswerR(idAnswerR, req.body);
        res.json(answerR);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteAnswerR (req, res){
    try {
        const idAnswerR = req.query.idAnswerR;
        const answerR = await answerRService.deleteAnswerR(idAnswerR);
        res.json(answerR);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createAnswerR, getAnswerRById, getAllAnswerRs, getLimitedAnswerRs, updateAnswerR, deleteAnswerR }