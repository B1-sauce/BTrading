const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(PORT, function () {
  console.log('listening on port ' + PORT);
});