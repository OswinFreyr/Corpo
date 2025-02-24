const express = require("express");
const router = express.Router()

const answerRController = require("../controllers/answerRController");

router.get("/", answerRController.getAllAnswerRs);
router.get("/limit", answerRController.getLimitedAnswerRs);
router.get("/id", answerRController.getAnswerRById);

router.post("/", answerRController.createAnswerR);

router.patch("/update", answerRController.updateAnswerR);

router.delete("/delete", answerRController.deleteAnswerR)

module.exports = router;