"use strict";

var express = require('express');

var animals = require('./babel/animals.js');

var app = express();

app.get('/', function(req, res) {
  res.send("Hello world from Babel.");
});

app.get('/animal', function(req, res) {
  var fox = new animals.Fox("Merp", "???");

  res.send(fox.speak());
});

app.get('/simple-hash', function(req, res) {
  var hash = function(str) {
    var s1 = 1;
    var s2 = 0;

    for (var i = 0; i < str.length; ++i) {
      s1 = (s1 + str.charCodeAt(i)) % 65521;
      s2 = (s1 + s2) % 65521;
    }

    return (s2 << 16) | s1;
  };

  if (req.query.message == null) {
    res.status(400).send('Message not provided.');
    return;
  }

  var val = hash(req.query.message);
  res.send('{"val": ' + val.toString() + '}');
});

var port = process.env.port || 1337;
app.listen(port, function() {
  console.log("Listening on " + port);
});
