"use strict";

express = require 'express'
bodyParser = require 'body-parser'
animals = require './coffee/animals'
callbacks = require './coffee/callbacks'

app = express()

# Middleware
app.use bodyParser.json()

app.get '/', (req, res) ->
  res.send 'Hello world from CoffeeScript.'

app.get '/simple-hash', (req, res) ->
  hash = (str) ->
    [s1, s2] = [1, 0]
    for i in [0..(str.length - 1)]
      s1 = (s1 + str.charCodeAt i) % 65521
      s2 = (s1 + s2) % 65521

    (s2 << 16) | s1


  res.set(400).send('Missing message.') unless req.query.message?
  val = hash(req.query.message)
  res.send '{"val": ' + val.toString() + '}'

app.get '/animal', (req, res) ->
  cat = new animals.Cat 'Derp', 'meow'

  res.send cat.speak()

app.get '/image', (req, res) ->
  # callbacks.regular 'The Matrix', (err, img) ->
  #   if err?
  #     console.log err
  #     return res.status(500).json err
  #
  #   res.contentType('image/jpeg').end img, 'binary'

  # callbacks.promises 'The Matrix'
  # .then (data) ->
  #   res.contentType('image/jpeg').end data, 'binary'
  # .catch (err) ->
  #   console.log err
  #   res.status(500).json err

  callbacks.shorterPromises 'The Matrix'
  .then (data) ->
    res.contentType('image/jpeg').end data, 'binary'
  .catch (err) ->
    console.log err
    res.status(500).json err

port = process.env.port || 1337
app.listen port, ->
  console.log 'Listening on ' + port
