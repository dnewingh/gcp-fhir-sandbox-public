// Import libraries
const {GoogleAuth} = require('google-auth-library');

const auth = new GoogleAuth(oauthOptions);
auth.getClient();

// Define handlers
async function queryBigQuery(req, res) {
  // Initialize gcloud authorization client
  const auth = new GoogleAuth(oauthOptions);
  const client = await auth.getClient();

  // For all options, see https://developers.google.com/drive/api/reference/rest/v3
  const requestOptions = {
    url: '',
    method: ''
  };
  
  // Run the query as a job
  const jobResponse = await client.request(requestOptions);
  //console.log(JSON.stringify(jobResponse.data.jobReference, null, 2));
}

// Function that returns 'hello world'
function getHelloWorld() {
    return 'hello world';
  }
  
  // Function that returns 'hello earth'
  function getHelloEarth() {
    return 'hello earth';
  }
  
  module.exports = { getHelloWorld, getHelloEarth };
  