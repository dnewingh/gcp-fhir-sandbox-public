const express = require("express");

// Import google-auth-library for authentication and client for hitting GCP APIs.
const {GoogleAuth} = require('google-auth-library');

// Import helpers

// Initialize constants
///bigquery/v2/projects/{projectId}/jobs
const bigqueryApiBaseUrl = 'https://bigquery.googleapis.com/bigquery/v2/projects/gcp-fhir-sandbox-lab-001/'
const oauthOptions = {
  scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/drive'],  //, 
};

// Define handlers
async function queryBigQuery(req, res) {
  //initialize gcloud authorization client
  const auth = new GoogleAuth(oauthOptions);
  const client = await auth.getClient();

  //const query = 'SELECT * FROM fhirstore_resource_streaming_d3_01.Patient LIMIT 2';
  const query = 'SELECT * FROM mock_data.vw_fhir_conditions_publish'

  //url: bigqueryApiBaseUrl + 'jobs/d33319e0-adfd-470c-a1f2-10e8b324df1e',
  const requestOptions = {
    url: bigqueryApiBaseUrl + 'queries',
    method: 'POST',
    data: {
      query: query,
      useLegacySql: false
    }
  };
  //console.log(requestOptions);
  const response = await client.request(requestOptions);
  //console.log(JSON.stringify(response, null, 2));

  /*
  //const query = `SELECT * FROM \`gcp-fhir-sandbox-lab-001.fhirstore_resource_streaming_d3_01.Patient\` LIMIT 2`;
  const query = `SELECT * FROM \`gcp-fhir-sandbox-lab-001.mock_data.vw_fhir_conditions_publish\` LIMIT 2`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results to console
  console.log('Rows:');
  rows.forEach(row => console.log(JSON.stringify(row, null, 2)));

  */
  //res.json(rows);
  res.json(response);
  
}

// Initialize Router object from Express and define routes
const router = express.Router();

//router.get("/:resourceType", searchResources);
//router.post("/:resourceType", searchResources);
//router.get("/", (req, res) => res.redirect('./metadata'));
router.get("/", queryBigQuery);

// Export the configured router object
module.exports = router;

/*
try {
  queryBigQuery();
} catch (err) {
  console.log(JSON.stringify(err, null, 2));
}
*/