"use strict";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Dog } from './type/animals';

class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    let app = express();
    app.use(bodyParser.json());

    let pairs: [[string, (req: express.Request, res: Express.Response) => void]] = [
      ['/', this.hello],
      ['/simple-hash', this.simpleHash],
      ['/animal', this.animal]
    ];

    for (let tuple of pairs) {
      app.get(tuple[0], tuple[1]);
    }

    this.app = app;
  }

  public start(port: number): void {
    this.app.listen(port, function() {
      console.log('Listening on ' + port);
    });
  }

  private hello(req: express.Request, res: express.Response) {
    res.send('Hello world from TypeScript.');
  }

  private simpleHash(req: express.Request, res: express.Response) {
    let hash = function(str: string): number {
      let s1: number = 1;
      let s2: number = 0;

      for (let i = 0; i < str.length; ++i) {
        s1 = (s1 + str.charCodeAt(i)) % 65521;
        s2 = (s1 + s2) % 65521;
      }

      return (s2 << 16) | s1;
    };

    if (req.query.message == null) {
      res.status(400).send("No message provided");
      return;
    }

    let val = hash(req.query.message);
    res.send('{"val": ' + val.toString() + '}');
  }

  private animal(req: express.Request, res: express.Response) {
    var dog = new Dog("Herp", "woof");

    res.send(dog.speak());
  }
}

let port: number = process.env.port || 1337;
let server = Server.bootstrap();
server.start(port);
