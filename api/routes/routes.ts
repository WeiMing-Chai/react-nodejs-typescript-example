import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import Patient from "./patient";

class Routes {

    public express: express.Application;
    public logger: Logger;

    // array to hold patients
    public patients: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
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