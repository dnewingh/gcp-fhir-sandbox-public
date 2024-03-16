//TO DO: add next() for non-operation routes and add test for the same to fhirstore-routes-integration.test.js

const express = require("express");

const expandedValueSets = require("../helpers/expanded-valuesets.json");

//initialize Router object from Express
const router = express.Router();

//define handlers
function expandValueSet(req, res) {
    //TO DO: Implement proper valueset expansion service
    const filteredValueSets = expandedValueSets.entry.find((el) => el.id == req.params.resourceId);
    
    if (filteredValueSets) {
        res.json(filteredValueSets);
    } else {
        const operationOutcome = {
            resourceType: 'OperationOutcome',
            issue: [
                {
                    severity: 'error',
                    code: 'processing',
                    diagnostics: 'Resource ValueSet/' + req.params.resourceId + ' is not known'
                }
            ]
        };
    
        res.status(404).json(operationOutcome);
    }
}
   
//define routes
router.get("/:resourceId/([\$])expand", expandValueSet);

//export the configured router object
module.exports = router;