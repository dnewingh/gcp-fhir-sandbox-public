//import 3rd party packages and libraries
const express = require('express');

//import our own files
const bigqueryRoutes = require("./routes/bigquery-routes");

// Create an Express object and routes (in order)
const app = express();
app.use('/bigquery/', bigqueryRoutes);
app.get('/', (req, res) => { res.status(200).send('Hello World'); })  //root requires 200 response to trigger automated testing with start-server-and-test package

//handle route not found
app.use((req, res) => { res.status(404).send('Bad URL'); });

// Set our GCF handler to our Express app.
module.exports = {
    app
  };