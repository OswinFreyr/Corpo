const express = require("express");
const router = express.Router()

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/limit", userController.getLimitedUsers);
router.get("/id", userController.getUserById);

router.post("/", userController.createUser);

router.post("/update", userController.updateUser);

router.delete("/delete", userController.deleteUser)

module.exports = router;