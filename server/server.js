const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const db = require('../db/index.js');
const controller = require('../db/controller.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/data', controller.handleFetchDB);
app.get('/api/data', controller.handleGetFromAPI)
app.get('/api/add', controller.handleAddToList)
app.delete('/delete', controller.handleDelet)

app.listen(PORT, function () {
  console.log('listening on port ' + PORT);
});