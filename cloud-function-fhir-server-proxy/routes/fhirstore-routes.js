const express = require("express");
const google = require('@googleapis/healthcare');

//initialize constants
const fhirStorePath = 'https://healthcare.googleapis.com/v1/projects/gcp-fhir-sandbox-lab-001/locations/us-central1/datasets/GCP-FHIR-Sandbox-Lab-001-Healthcare-Dataset-001/fhirStores/FHIRSTORE-001'

// Import google-auth-library for authentication.
const {GoogleAuth} = require('google-auth-library');

const searchFhirResourcesGet = async (req, res) => {
  /*
  const healthcare = google.healthcare({
    version: 'v1',
    auth: new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    }),
  });
  
  const getFhirStoreCapabilities = async () => {
    // TODO(developer): uncomment these lines before running the sample
    // const cloudRegion = 'us-central1';
    // const projectId = 'adjective-noun-123';
    // const datasetId = 'my-dataset';
    // const fhirStoreId = 'my-fhir-store';
    const name = `projects/gcp-fhir-sandbox-lab-001/locations/us-central1/datasets/GCP-FHIR-Sandbox-Lab-001-Healthcare-Dataset-001/fhirStores/FHIRSTORE-001/fhir/metadata`;
    const request = {name};
  
    console.log('Preparing request');
    const fhirStore = await healthcare.projects.locations.datasets.fhirStores.get(request);
    
    console.log(fhirStore);
    //console.log(JSON.stringify(fhirStore.data, null, 2));
    console.log(typeof fhirStore.data);
    console.log(fhirStore.headers['content-type']);
    console.log(fhirStore.data);
    //console.log(await fhirStore.data.text());
  };
  
  getFhirStoreCapabilities();
  res.send('Check log');
  */
  

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
  });
  // TODO(developer): uncomment these lines before running the sample
  // const cloudRegion = 'us-central1';
  // const projectId = 'adjective-noun-123';
  // const datasetId = 'my-dataset';
  // const fhirStoreId = 'my-fhir-store';
  // const resourceType = 'Patient';
  //const url = `https://healthcare.googleapis.com/v1/projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir/${resourceType}`;

  //const resourceType = 'metadata';
  const resourceType = 'Patient/Patient-1';
    //const resourceType = 'Patient/Patient-0';
    const url = fhirStorePath + '/fhir/' + resourceType;

  const params = {};
  // Specify search filters in a params object. For example, to filter on a
  // Patient with the last name "Smith", set resourceType to "Patient" and
  // specify the following params:
  // params = {'family:exact' : 'Smith'};
  const client = await auth.getClient();
  //const response = await client.request({url, method: 'GET', params});
  const response = await client.request({url});
  //const response = await client.request({url: 'https://us-central1-gcp-fhir-sandbox-lab-001.cloudfunctions.net/nodejs-http-function/users/'})
  //console.log(response);
  //console.log(response.data);
  console.log('InstanceOf Blob?:' + response.data instanceof Blob)
  console.dir(response.data);
  console.log(response.data.toString());
  //const resources = response.data.entry;
  //console.log(`Resources found: ${resources.length}`);
  //console.log(JSON.stringify(resources, null, 2));
  
  //read blob
  responseDataText = await response.data.text();
  resonseDataJsObect = JSON.parse(responseDataText);
  //console.log(resonseDataJsObect);
  res.json(resonseDataJsObect);
  
};

//searchFhirResourcesGet();

//initialize Router object from Express
const router = express.Router();

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
        //const resourceType = 'Patient/Patient-0';
        const url = fhirStorePath + '/fhir/' + resourceType;
        const params = req.query;
        const client = await authClient.getClient();
        const response = await client.request({url, method: 'GET', params});
        console.log(JSON.stringify(response.data.entry, null, 2));
        res.json(JSON.stringify(response, null, 2));
        
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }    
}
   
//define routes
router.get("/metadata", getMetadata);
//router.get("/", getMetadata);
router.get("/", searchFhirResourcesGet);

//export the configured router object
module.exports = router;