const express = require("express");

// Import google-auth-library for authentication.
const {GoogleAuth} = require('google-auth-library');

// Import helpers
const {createRequestOptionsForHealthcareAPI} = require('../helpers/index');

//initialize constants
const fhirStorePath = 'https://healthcare.googleapis.com/v1/projects/gcp-fhir-sandbox-lab-001/locations/us-central1/datasets/GCP-FHIR-Sandbox-Lab-001-Healthcare-Dataset-001/fhirStores/FHIRSTORE-001'
const oauthOptions = {
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
};

//initialize Router object from Express
const router = express.Router();

//define handlers
async function queryFhirstore(req, res) {
    req.forwardingUrl = fhirStorePath + req.originalUrl;
    console.log(req.forwardingUrl);
    //const params = req.query;
    
    //initialize gcloud authorization client
    const auth = new GoogleAuth(oauthOptions);
    const client = await auth.getClient();

    const requestOptions = createRequestOptionsForHealthcareAPI(req);
    //console.log(requestOptions);
    const response = await client.request(requestOptions);
    //console.log(JSON.stringify(response, null, 2));
    res.status(response.status).type('application/fhir+json').send(response.data);
}
   
//define routes
router.all("*", queryFhirstore);

//export the configured router object
module.exports = router;