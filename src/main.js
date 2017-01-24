var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send('Hello worlddd');
});

var port = process.env.port || 1337;
app.listen(port, function() {
  console.log('Listening on: ' + port);
});
