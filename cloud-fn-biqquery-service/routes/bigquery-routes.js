const express = require("express");

// Import the Google Cloud client library using default credentials
const {BigQuery} = require('@google-cloud/bigquery');

// Import helpers

// Initialize constants

// Define handlers
const bigquery = new BigQuery();
async function queryBigQuery(req, res) {
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

  res.json(rows);
}

// Initialize Router object from Express and define routes
const router = express.Router();

//router.get("/:resourceType", searchResources);
//router.post("/:resourceType", searchResources);
//router.get("/", (req, res) => res.redirect('./metadata'));
router.get("/", queryBigQuery);

// Export the configured router object
module.exports = router;