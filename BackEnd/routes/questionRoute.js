const express = require("express");
const router = express.Router()

const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.get("/limit", questionController.getLimitedQuestions);
router.get("/id", questionController.getQuestionById);

router.post("/", questionController.createQuestion);

router.patch("/update", questionController.updateQuestion);

router.delete("/delete", questionController.deleteQuestion)

module.exports = router;