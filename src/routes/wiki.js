const express = require("express");
const router = express.Router();
 const helper = require("../auth/helpers");
 const validation = require("./validation");

const wikiController = require("../controllers/wikiController")

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", wikiController.create,
helper.ensureAuthenticated);
router.get("/wikis/:id", wikiController.show);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);

module.exports = router;
