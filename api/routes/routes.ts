import * as bodyParser from "body-parser";
import express from "express";
import Patient from "./patient";

class Routes {

    public express: express.Application;

    // array to hold patients
    public patients: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // patient route
        this.express.use("/", Patient);
    }
}

export default new Routes().express;