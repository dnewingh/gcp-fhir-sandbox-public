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
async function searchResources(req, res) {
  try {
      const resourceType = req.params.resourceType;
      const url = fhirStorePath + '/fhir/' + resourceType;
      const params = req.query;
      
      //initialize gcloud authorization client
      const auth = new GoogleAuth(oauthOptions);
      const client = await auth.getClient();

      //send request
      const response = await client.request({url, method: req.method, params});
      console.log(response);

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

async function getResourceById(req, res) {
  try {
      const resourceType = req.params.resourceType;
      const resourceId = req.params.resourceId;
      const url = fhirStorePath + '/fhir/' + resourceType + '/' + resourceId;
      const params = req.query;
      
      //initialize gcloud authorization client
      const auth = new GoogleAuth(oauthOptions);
      const client = await auth.getClient();

      //send request
      const response = await client.request({url, method: 'GET', params});
      //console.log(response);

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

//define handlers
async function queryFhirstore(req, res) {
  try {
      const resourceType = req.params.resourceType;
      const url = fhirStorePath + req.originalUrl;
      console.log(url);
      //const params = req.query;
      
      //initialize gcloud authorization client
      const auth = new GoogleAuth(oauthOptions);
      const client = await auth.getClient();
      
      //send request
      //console.log(Object.keys(req.body).length>0);
      const requestOptions = {
        url, 
        method: req.method, 
        ...(Object.keys(req.body).length>0 && {data: req.body}) //conditionally adds data propoerty to request options if req.body has data
      };
      //console.log(requestOptions);
      const response = await client.request(requestOptions);
      //console.log(JSON.stringify(response, null, 2));

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
      
  } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      res.status(400).json({message: error});
  }    
}
   
//define routes
//router.get("/:resourceType/:resourceId", getResourceById);
//router.get("/:resourceType", searchResources);
//router.post("/:resourceType", searchResources);
//router.get("/", (req, res) => res.redirect('./metadata'));
router.all("*", queryFhirstore);

//export the configured router object
module.exports = router;