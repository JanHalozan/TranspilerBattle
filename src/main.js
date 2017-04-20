"use strict";

const express = require('express');
const animals = require('./babel/animals.js');
const callbacks = require('./babel/callbacks.js');

var app = express();

app.get('/', function(req, res) {
  res.send("Hello world from Babel.");
});

app.get('/animal', function(req, res) {
  const fox = new animals.Fox("Merp", "???");

  res.send(fox.speak());
});

app.get('/simple-hash', function(req, res) {
  var hash = function(str) {
    var [s1, s2] = [1, 0];

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

  const val = hash(req.query.message);
  res.send('{"val": ' + val.toString() + '}');
});

app.get('/image', function(req, res) {
  callbacks.regular('The Matrix', function(err, img) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.contentType('image/jpeg').end(img, 'binary');
  });

  // callbacks.promises('The Matrix')
  // .then(function (data) {
  //   res.contentType('image/jpeg').end(data);
  // })
  // .catch(function (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // });

  // callbacks.shorterPromises('The Matrix')
  // .then(function (data) {
  //   res.contentType('image/jpeg').end(data);
  // })
  // .catch(function (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});

const port = process.env.port || 1337;
app.listen(port, function() {
  console.log("Listening on " + port);
});
