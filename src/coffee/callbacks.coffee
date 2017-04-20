request = require 'request'
sharp = require 'sharp'

bluebird = require 'bluebird'
requestPromise = bluebird.promisifyAll request

encode = (str) ->
  encodeURIComponent str

regular = (title, resultCallback) ->
  request.get "http://www.omdbapi.com/?t=#{encode title}", (err, response, raw) ->
    return resultCallback err, null if err?

    body = JSON.parse raw
    options =
      url: body.Poster
      encoding: null

    request.get options, (err, response, body) ->
      return resultCallback err, null if err?
      sharp(body).resize(100).toBuffer (err, data) ->
        resultCallback err, data

promises = (title) ->
  requestPromise.getAsync "http://www.omdbapi.com/?t=#{encode title}"
  .then (res) ->
    body = JSON.parse res.body
    options =
      url: body.Poster
      encoding: null

    requestPromise.getAsync options
  .then (res) ->
    sharp(res.body).resize(100).toBuffer()

shorterPromises = (title) ->
  res = yield requestPromise.getAsync "http://www.omdbapi.com/?t=#{encode title}"
  body = JSON.parse res.body
  options =
    url: body.Poster
    encoding: null
  res = yield requestPromise.getAsync options
  sharp(res.body).resize(100).toBuffer()

module.exports =
  regular: regular
  promises: promises
  shorterPromises: bluebird.coroutine shorterPromises
