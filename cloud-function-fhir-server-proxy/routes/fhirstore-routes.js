const express = require("express");
const google = require('@googleapis/healthcare');

//initialize Router object from Express
const router = express.Router();

//define handlers
function getMetadata(req, res) {
    // TODO: Integrate with FHIR store
    res.send(['capability', 'statement']);
}
   
//define routes
router.get("/metadata", getMetadata);
router.get("/", getMetadata);

//export the configured router object
module.exports = router;