const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/:id", auth, userController.getUserById);
router.patch("/:id", auth, userController.updateUserField);
router.delete("/:id", auth, userController.deleteUser);

router.post("/:id/savedArticles", auth, userController.addSavedArticle);
router.delete("/:id/savedArticles", auth, userController.removeSavedArticle);

module.exports = router;
