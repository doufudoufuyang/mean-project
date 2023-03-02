const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const cors = require('cors')

app.use(cors())

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Applying middleware
app.use('/', express.json()); // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))); // serve static files

// Template engine configuration
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "/views")); // where template files are located

// Importing other routes
app.use('/user', routes.UserRouter)

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
  res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` });
});

module.exports = app;