express = require 'express'

app = express()
port = process.env.port || 1337

app.get '/', (req, res) ->
  res.send 'Hello world'

app.listen port, ->
  console.log 'Listening on ' + port
