express = require 'express'
bodyParser = require 'body-parser'

app = express()
port = process.env.port || 1337

#Middleware
app.use bodyParser.json()

app.get '/', (req, res) ->
  res.send 'Hello world'

app.post '/light', (req, res) ->
  highResTime = process.hrtime()
  microtime = highResTime[0] * 1000000 + highResTime[1] / 1000
  res.send req.body.message + ' at: ' + microtime.toString()

# app.get '/heavy', (req, res) ->
#

app.listen port, ->
  console.log 'Listening on ' + port
