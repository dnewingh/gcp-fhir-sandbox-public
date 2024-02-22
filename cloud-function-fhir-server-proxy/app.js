//import 3rd party packages and libraries
const express = require('express');

//import our own files
const userRoutes = require("./routes/user-routes");
const fhirstoreRoutes = require("./routes/fhirstore-routes");
const testRoutes = require("./routes/test-routes");

// Create an Express object and routes (in order)
const app = express();
app.use('/users/', userRoutes);
app.use('/fhir/', fhirstoreRoutes);
app.use('/test/', testRoutes);
app.use('/', (req, res) => { res.status(200).send('Hello World'); })  //root requires 200 response to trigger automated testing with start-server-and-test package

//handle route not found
app.use((req, res) => { res.status(404).send('Bad URL'); });

// Set our GCF handler to our Express app.
module.exports = {
    app
  };