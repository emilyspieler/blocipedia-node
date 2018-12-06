const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");

const wikiController = require("../controllers/wikiController")

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);

router.get("/wikis/newPrivate", wikiController.newPrivate);

router.post("/wikis/create", wikiController.create,
helper.ensureAuthenticated);
router.post("/wikis/createPrivate", wikiController.createPrivate,
helper.ensureAuthenticated);

router.get("/wikis/:id", wikiController.show);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);

router.get("/wikis/:id/makePublic", wikiController.makePublic);
router.post("/wikis/:id/makePublic", wikiController.makePublic);
router.get("/wikis/:id/makePrivate", wikiController.makePrivate);
router.post("/wikis/:id/makePrivate", wikiController.makePrivate);

/* router.get("/wikis/:id/edit/updateCollaborator", wikiController.updateCollaborator);
router.post("/wikis/:id/edit/updateCollaborator", wikiController.updateCollaborator);
router.get("/wikis/:id/edit/updateCollaboratorRemove", wikiController.updateCollaboratorRemove);
router.post("/wikis/:id/edit/updateCollaboratorRemove", wikiController.updateCollaboratorRemove); */

module.exports = router;
