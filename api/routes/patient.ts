import * as bodyParser from "body-parser";
import express from "express";

import patientRepository from '../repository/patient.repository';

import session from 'express-session';
import Keycloak from 'keycloak-connect';

class User {

    public express: express.Application;
    public memoryStore = new session.MemoryStore();
    public keycloak = new Keycloak({ store: this.memoryStore });


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

        this.express.use(session({
            secret:'thisShouldBeLongAndSecret',
            resave: false,
            saveUninitialized: true,
            store: this.memoryStore
          }));
        this.express.use(this.keycloak.middleware());
    }

    private routes(): void {
        // request to get all the users
        this.express.get("/patients",  this.keycloak.enforcer(['resource:view'], {
            resource_server_id: 'predictz-gateway-client'
          }), (req, res, next) => {
            console.log((req as any).kauth.grant.access_token.content.sub)
            patientRepository.getPatients(req).then(data => res.json(data));
        });

        // request to post the patients
        this.express.post("/patient", this.keycloak.enforcer(['resource:write'], {
            resource_server_id: 'predictz-gateway-client'
          }), (req, res, next) => {
            this.patients.push(req.body.patient);
            patientRepository.createPatient(req).then(data => res.json(data));
        });
    }
}

export default new User().express;