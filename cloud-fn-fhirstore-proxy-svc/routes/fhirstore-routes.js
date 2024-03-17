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
  try {
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

      /*
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
      res.status(response.status).json(responseDataJsObect);
      */
      
  } catch (error) {
      if (error.status=400) {
        console.log(JSON.stringify(error, null, 2));
        res.status(error.status).send(error.response.data);
      } else {
        res.status(error.status).json(error);
      }
      //console.log(JSON.stringify(error, null, 2));
      //res.status(400).json({message: error});
      
  }    
}
   
//define routes
router.all("*", queryFhirstore);

//export the configured router object
module.exports = router;