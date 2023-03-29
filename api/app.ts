import * as bodyParser from "body-parser";
import express from "express";
import logger from "./logger/logger";
import Routes from "./routes/routes";
const path = require('path');

class App {

    public express: express.Application;

    // array to hold patients
    public patients: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.patients = [];
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(process.cwd() + "/my-app/build/"));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.sendFile(process.cwd() + "/my-app/build/index.html");
        });

        // user route
        this.express.use("/api", Routes);

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;