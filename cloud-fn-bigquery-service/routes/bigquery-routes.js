/*
Querying tables that are connected to Google Drive requires authentication
with the 'drive' scope.  As of 3/2024 the Node.JS BigQuery client library
does not have an option to set auth scopes so the GoogleAuth library is 
used instead to initiate the query job.  Then the BigQuery library is used to 
retreive to query job results because it translates the underlying API response
which is a series of JSON f,v objects for indicating fields and values, into
its corresponding JSON object.
*/

const express = require("express");

// Import libraries
const {GoogleAuth} = require('google-auth-library');
const {BigQuery} = require('@google-cloud/bigquery');
const { parseNestedStringsFromArrayOfObjects } = require("../helpers");

// Initialize constants
const bigqueryApiBaseUrl = 'https://bigquery.googleapis.com/bigquery/v2/projects/gcp-fhir-sandbox-lab-001/'
const oauthOptions = {
  scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/drive'],  //, 
};

// Define handlers
async function queryBigQuery(req, res) {
  // Initialize gcloud authorization client
  const auth = new GoogleAuth(oauthOptions);
  const client = await auth.getClient();

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/Job
  const query = 'SELECT * FROM mock_data.' + req.params.tableName;
  const requestOptions = {
    url: bigqueryApiBaseUrl + 'jobs',
    method: 'POST',
    data: {
      configuration: {
        query: {
          query: query,
          useLegacySql: false
        }
      }
    }
  };
  
  // Run the query as a job
  const jobResponse = await client.request(requestOptions);
  //console.log(JSON.stringify(jobResponse.data.jobReference, null, 2));

  // Use BigQuery library to retrieve instance of job object using the jobId
  const bigquery = new BigQuery();
  const job = bigquery.job(jobResponse.data.jobReference.jobId);

  // Wait for the query to finish
  const [rawResults] = await job.getQueryResults();

  // Cleanup nested strings in query result
  const processedResults = parseNestedStringsFromArrayOfObjects(rawResults);

  // Print the results to console
  //console.log('Rows:');
  //rows.forEach(row => console.log(JSON.stringify(row, null, 2)));

  res.json(processedResults);
}

// Initialize Router object from Express and define routes
const router = express.Router();
router.get("/:tableName", queryBigQuery);

// Export the configured router object
module.exports = router;