const express = require("express");
const router = express.Router()

const roleController = require("../controllers/roleController");

router.get("/", roleController.getAllRoles);
router.get("/limit", roleController.getLimitedRoles);
router.get("/id", roleController.getRoleById);

router.post("/", roleController.createRole);

router.patch("/update", roleController.updateRole);

router.delete("/delete", roleController.deleteRole)

module.exports = router;