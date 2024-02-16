const express = require("express");
const google = require('@googleapis/healthcare');

//initialize Router object from Express
const router = express.Router();

//initialize constants
fhirStorePath = 'https://healthcare.googleapis.com/v1/projects/gcp-fhir-sandbox-lab-001/locations/us-central1/datasets/GCP-FHIR-Sandbox-Lab-001-Healthcare-Dataset-001/fhirStores/FHIRSTORE-001'

//initialize gcloud authorization client
const oauthOptions = {
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  };
const authClient = new google.auth.GoogleAuth(oauthOptions);

//define handlers
async function getMetadata(req, res) {
    // TODO: Integrate with FHIR store
    //res.send(['capability', 'statement']);

    try {
        const resourceType = 'metadata';
        const url = fhirStoreUrl + '/fhir/' + resourceType;
        const params = req.query;
        const client = await authClient.getClient();
        const response = await client.request({url, method: 'GET', params});
        res.send(response.data);
        
    } catch (error) {
        res.send({message: error})
    }    
}
   
//define routes
router.get("/metadata", getMetadata);
router.get("/", getMetadata);

//export the configured router object
module.exports = router;