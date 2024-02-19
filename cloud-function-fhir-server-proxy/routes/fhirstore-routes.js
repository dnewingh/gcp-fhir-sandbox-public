const express = require("express");

// Import google-auth-library for authentication.
const {GoogleAuth} = require('google-auth-library');

//initialize constants
const fhirStorePath = 'https://healthcare.googleapis.com/v1/projects/gcp-fhir-sandbox-lab-001/locations/us-central1/datasets/GCP-FHIR-Sandbox-Lab-001-Healthcare-Dataset-001/fhirStores/FHIRSTORE-001'
const oauthOptions = {
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
};

//initialize Router object from Express
const router = express.Router();

//define handlers
async function getMetadata(req, res) {
    try {
        const resourceType = 'metadata';
        const url = fhirStorePath + '/fhir/' + resourceType;
        const params = req.query;
        
        //initialize gcloud authorization client
        const auth = new GoogleAuth(oauthOptions);
        const client = await auth.getClient();

        //send request
        const response = await client.request({url, method: 'GET', params});

        //determine if data type in response contains blob and handle accordingly
        const responseDataToString = response.data.toString();
        //console.log(responseDataToString);
        let responseDataJsObect = {};

        if (responseDataToString == '[object Blob]') {
          //read blob text and convert to JS object
          const responseDataText = await response.data.text();
          responseDataJsObect = JSON.parse(responseDataText);
        } else {
          responseDataJsObect = response.data;
        }
        
        //console.log(resonseDataJsObect);
        res.json(responseDataJsObect);
        
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }    
}
   
//define routes
router.get("/metadata", getMetadata);
router.get("/", getMetadata);

//export the configured router object
module.exports = router;