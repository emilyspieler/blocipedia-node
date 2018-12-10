const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");

const wikiController = require("../controllers/wikiController");
const userController = require("../controllers/userController");
const collaboratorController = require("../controllers/collaboratorController");

router.get("/wikis/:wikiId/collaborations/new", collaboratorController.new);
router.post("/wikis/:wikiId/collaborations/create", collaboratorController.create);
router.get("/wikis/:wikiId/collaborations/:id", collaboratorController.show);

module.exports = router;
