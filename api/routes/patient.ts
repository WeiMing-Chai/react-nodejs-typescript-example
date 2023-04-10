import * as bodyParser from "body-parser";
import express from "express";
import logger from "../logger/logger";

import patientRepository from '../repository/patient.repository';


class User {

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
    }

    private routes(): void {

        // request to get all the users
        this.express.get("/patients", (req, res, next) => {
            patientRepository.getPatients().then(data => res.json(data));
        });

        // request to post the patients
        this.express.post("/patient", (req, res, next) => {
            this.patients.push(req.body.patient);
            patientRepository.createPatient(req.body.patient).then(data => res.json(data));
        });

        // // request to get all the users by userName
        // this.express.get("/users/:userName", (req, res, next) => {
        //     this.logger.info("url:::::" + req.url);
        //     const user = this.patients.filter(function(user) {
        //         if (req.params.userName === user.userName) {
        //             return user;
        //         }
        //     });
        //     res.json(user);
        // });

    }
}

export default new User().express;