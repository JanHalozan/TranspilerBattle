"use strict";
const express = require("express");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        let app = express();
        app.get('/', function (req, res) {
            res.send("Derp");
        });
        this.app = app;
    }
    start(port) {
        this.app.listen(port, function () {
            console.log("Listening on " + port);
        });
    }
}
let server = Server.bootstrap();
server.start(1337);
