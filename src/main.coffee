"use strict";

express = require 'express'
bodyParser = require 'body-parser'
animals = require './coffee/animals'

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

app.post '/light', (req, res) ->
  highResTime = process.hrtime()
  microtime = highResTime[0] * 1000000 + highResTime[1] / 1000
  res.send req.body.message + ' at: ' + microtime.toString()

port = process.env.port || 1337
app.listen port, ->
  console.log 'Listening on ' + port
