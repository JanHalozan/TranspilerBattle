const request = require('request');
const sharp = require('sharp');

const bluebird = require('bluebird');
const requestPromise = bluebird.promisifyAll(request);

const encode = function(str) {
  return encodeURIComponent(str);
}

const regular = function(title, resultCallback) {
  request.get(`http://www.omdbapi.com/?t=${encode(title)}`, function (err, response, raw) {
    if (err) {
      return resultCallback(err, null);
    }

    const body = JSON.parse(raw);
    const options = {
      url: body.Poster,
      encoding: null
    };

    request.get(options, function (err, response, body) {
      if (err) {
        return resultCallback(err, null);
      }

      sharp(body).resize(100).toBuffer(function (err, data) {
        resultCallback(err, data);
      });
    });
  });
};

const promises = function(title) {
  return requestPromise.getAsync(`http://www.omdbapi.com/?t=${encode(title)}`)
  .then(function (res) {
    const body = JSON.parse(res.body);
    const options = {
      url: body.Poster,
      encoding: null
    };

    return requestPromise.getAsync(options);
  })
  .then(function (res) {
    return sharp(res.body).resize(100).toBuffer();
  });
};

const shorterPromises = function*(title) {
  var res = yield requestPromise.getAsync(`http://www.omdbapi.com/?t=${encode(title)}`);
  const body = JSON.parse(res.body);
  const options = {
    url: body.Poster,
    encoding: null
  };

  res = yield requestPromise.getAsync(options);
  return sharp(res.body).resize(100).toBuffer();
};

module.exports = {
  regular,
  promises,
  shorterPromises: bluebird.coroutine(shorterPromises)
};
