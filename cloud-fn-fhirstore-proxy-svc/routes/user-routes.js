const express = require("express");

//initialize Router object from Express
const router = express.Router();

//define handlers
function getAllUsers(req, res) {
    // TODO: Get users from a database
    res.send(['Alice', 'Bob']);
}
  
function getUser(req, res) {
    // TODO: Get user details
    res.send({ name: 'Alice', location: 'LAX', });
}
  
//define routes
router.get("/user/:uid", getUser);
router.get("/", getAllUsers);

//export the configured router object
module.exports = router;