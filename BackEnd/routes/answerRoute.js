const express = require("express");
const router = express.Router()

const answerController = require("../controllers/answerController");

router.get("/", answerController.getAllAnswers);
router.get("/limit", answerController.getLimitedAnswers);
router.get("/id", answerController.getAnswerById);

router.post("/", answerController.createAnswer);

router.patch("/update", answerController.updateAnswer);

router.delete("/delete", answerController.deleteAnswer)

module.exports = router;