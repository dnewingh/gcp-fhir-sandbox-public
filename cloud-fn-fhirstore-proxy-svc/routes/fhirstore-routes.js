const express = require("express");

// Import google-auth-library for authentication.
const {GoogleAuth} = require('google-auth-library');

// Import helpers
const {createRequestOptionsForHealthcareAPI} = require('../helpers/index');

//initialize constants
const fhirStorePath = process.env.FHIRSTORE_URL;
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