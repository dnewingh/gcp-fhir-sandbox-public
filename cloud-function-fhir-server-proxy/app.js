//import 3rd party packages and libraries
const express = require('express');

//import our own files
const userRoutes = require("./routes/user-routes");

// Create an Express object and routes (in order)
const app = express();
app.use('/users/', userRoutes);

//handle route not found
app.use((req, res) => { res.status(404).send('Bad URL'); });

// Set our GCF handler to our Express app.
module.exports = {
    app
  };