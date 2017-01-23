"use strict";

import * as express from 'express';
import * as bodyParser from "body-parser";
import * as path from "path";

class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    let app = express();

    app.get('/', function(req: express.Request, res: express.Response) {
      res.send("Derp");
    });

    this.app = app;
    // this.config();


  }

  public start(port: number): void {
    this.app.listen(port, function(){
      console.log("Listening on " + port);
    });
  }
}

let server = Server.bootstrap();
server.start(1337);
