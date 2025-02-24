const express = require("express");
const router = express.Router()

const answerLController = require("../controllers/answerLController");

router.get("/", answerLController.getAllAnswerLs);
router.get("/limit", answerLController.getLimitedAnswerLs);
router.get("/id", answerLController.getAnswerLById);

router.post("/", answerLController.createAnswerL);

router.patch("/update", answerLController.updateAnswerL);

router.delete("/delete", answerLController.deleteAnswerL)

module.exports = router;