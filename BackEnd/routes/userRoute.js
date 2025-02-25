const express = require("express");
const router = express.Router()

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/limit", userController.getLimitedUsers);

router.post("/", userController.createUser);

router.patch("/update", userController.updateUser);

router.delete("/delete", userController.deleteUser)

module.exports = router;