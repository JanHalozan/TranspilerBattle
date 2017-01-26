"use strict";

import * as express from 'express';
import * as bodyParser from 'body-parser';

class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    let app = express();
    
    app.get('/', function(req: express.Request, res: express.Response) {
      res.send('Hello world from TypeScript.');
    });

    this.app = app;
  }

  public start(port: number): void {
    this.app.listen(port, function() {
      console.log('Listening on ' + port);
    });
  }
}

let port: number = process.env.port || 1337;
let server = Server.bootstrap();
server.start(port);
