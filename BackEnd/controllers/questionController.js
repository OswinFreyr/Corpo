const questionService = require("../services/questionService");

async function createQuestion(req, res) {
    try {
        const question = await questionService.createQuestion(req.body);
        res.json(question);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getQuestionById(req, res) {
    try {
        const id = req.query.id;
        const question = await questionService.getQuestionById(id);
        if(question){
            res.json(question);
        }
        else {
            res.json({"error": `Question ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllQuestions(req, res) {
    try{
        const { offset, limit, question, } = req.query;
        const questions = await questionService.getAllQuestions({ offset, limit, question, });
        res.json(questions);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedQuestions(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, question, } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await questionService.getLimitedQuestions({ offset, limit, question, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += question ? `&question=${question}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.questions, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateQuestion (req, res){
    try {
        const idQuestion = req.query.idQuestion;
        const question = await questionService.updateQuestion(idQuestion, req.body);
        res.json(question);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteQuestion (req, res){
    try {
        const idQuestion = req.query.idQuestion;
        const question = await questionService.deleteQuestion(idQuestion);
        res.json(question);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createQuestion, getQuestionById, getAllQuestions, getLimitedQuestions, updateQuestion, deleteQuestion }