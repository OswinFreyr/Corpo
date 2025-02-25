const answerService = require("../services/answerService");

async function createAnswer(req, res) {
    try {
        const answer = await answerService.createAnswer(req.body);
        res.json(answer);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAnswerById(req, res) {
    try {
        const id = req.query.id;
        const answer = await answerService.getAnswerById(id);
        if(answer){
            res.json(answer);
        }
        else {
            res.json({"error": `Answer ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllAnswers(req, res) {
    try{
        const { offset, limit, answer, } = req.query;
        const answers = await answerService.getAllAnswers({ offset, limit, answer, });
        res.json(answers);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedAnswers(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, answer, } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await answerService.getLimitedAnswers({ offset, limit, answer, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += answer ? `&answer=${answer}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.answers, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateAnswer (req, res){
    try {
        const idAnswer = req.query.idAnswer;
        const answer = await answerService.updateAnswer(idAnswer, req.body);
        res.json(answer);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteAnswer (req, res){
    try {
        const idAnswer = req.query.idAnswer;
        const answer = await answerService.deleteAnswer(idAnswer);
        res.json(answer);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createAnswer, getAnswerById, getAllAnswers, getLimitedAnswers, updateAnswer, deleteAnswer }