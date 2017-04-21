import * as request from 'request';
import * as sharp from 'sharp';

import * as bluebird from 'bluebird';
const requestPromise: any = bluebird.promisifyAll(request);

const encode = function(str: string): string {
  return encodeURIComponent(str);
};

const regular = function(title: string, resultCallback: Function): void {
  request.get(`http://www.omdbapi.com/?t=${encode(title)}`, function(err: any, response: request.RequestResponse, raw: any) {
    if (err) {
      return resultCallback(err, null);
    }

    const body = JSON.parse(raw);
    const options: request.UrlOptions & request.Options = {
      url: body.Poster,
      encoding: null
    };

    request.get(options, function(err: any, response: request.RequestResponse, body: any) {
      if (err) {
        return resultCallback(err, null);
      }

      sharp(body).resize(100).toBuffer(function(err, data) {
        resultCallback(err, data);
      });
    });
  });
}

const promises = function(title: string) {
  return requestPromise.getAsync(`http://www.omdbapi.com/?t=${encode(title)}`)
  .then(function (res: request.RequestResponse) {
    const body = JSON.parse(res.body);
    const options: request.UrlOptions & request.Options = {
      url: body.Poster,
      encoding: null
    };

    return requestPromise.getAsync(options);
  })
  .then(function(res: request.RequestResponse) {
    return sharp(res.body).resize(100).toBuffer();
  });
};

const shorterPromisesFunc = function*(title: string) {
  var res: request.RequestResponse = yield requestPromise.getAsync(`http://www.omdbapi.com/?t=${encode(title)}`);
  const body = JSON.parse(res.body);
  const options: request.UrlOptions & request.Options = {
    url: body.Poster,
    encoding: null
  };

  res = yield requestPromise.getAsync(options);
  return sharp(res.body).resize(100).toBuffer();
};
const shorterPromises = bluebird.coroutine(shorterPromisesFunc);

export {
  regular,
  promises,
  shorterPromises
}
