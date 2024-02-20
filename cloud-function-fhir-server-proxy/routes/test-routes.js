const express = require("express");

//initialize Router object from Express
const router = express.Router();

//define handlers
function getResource(req, res) {
    // TODO: Get users from a database
    console.log(req);
    res.send([req.params, req.query]);
}

function getResourceById(req, res) {
    // TODO: Get users from a database
    console.log(req);
    res.send(req.params);
}

//define routes
router.get("/:resourceType/:resourceId", getResourceById);
router.get("/:resourceType", getResource);

//export the configured router object
module.exports = router;