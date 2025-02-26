const express = require("express");
const router = express.Router()

const reasonController = require("../controllers/reasonController");

router.get("/", reasonController.getAllReasons);
router.get("/limit", reasonController.getLimitedReasons);
router.get("/id", reasonController.getReasonById);

router.post("/", reasonController.createReason);

router.patch("/update", reasonController.updateReason);

router.delete("/delete", reasonController.deleteReason)

module.exports = router;