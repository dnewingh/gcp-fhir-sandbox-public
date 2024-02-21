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

function logging (req, res) {
    console.log(req.originalUrl);
    console.log(req.url);
    res.send('hello');
}

//define routes
//router.get("/:resourceType/:resourceId", getResourceById);
//router.get("/:resourceType", getResource);
router.get("*", logging);

//export the configured router object
module.exports = router;