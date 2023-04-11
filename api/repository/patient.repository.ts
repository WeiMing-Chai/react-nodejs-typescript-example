// import connect from '../config/db.config';

import prisma from "../prisma/prisma";
import logger from "../logger/logger";
import { EventType, EventOutcome, Level } from "../enum/constants";
import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";

class PatientRepository {

    async getPatients(req: Request<{}, any, any, ParsedQs, Record<string, any>>) {
        
        try {
            const patients = await prisma.patients.findMany();
            const information_logged = {
                "user_id": "123",
                "event": EventType.retrievePatient,
                "outcome": EventOutcome.success,
                "ip_address": req.ip,
                "application_id": process.env.APPLICATION_ID,
                "level": Level.level0,
                "description": "Retrieving all patient data information",
                "from": null,
                "to": null,
            }
            logger.info(information_logged);
            return patients;
        } catch (err) {
            logger.error('Error::' + err);
            return [];
        }
    }

    async createPatient(req: Request<{}, any, any, ParsedQs, Record<string, any>>) {
        let data = {};
        try {
            // new_patient.createdat = new Date().toISOString();
            data = await prisma.patients.create({
                data: req.body.patient
            });
            const information_logged = {
                "user_id": "123",
                "event": EventType.registerPatient,
                "outcome": EventOutcome.success,
                "ip_address": req.ip,
                "application_id": process.env.APPLICATION_ID,
                "level": Level.level0,
                "description": "Registering new patient",
                "from": null,
                "to": null,
            }
            logger.info(information_logged);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    // async updateTask(task: any) {
    //     let data = {};
    //     try {
    //         task.updatedat = new Date().toISOString();
    //         data = await this.db.tasks.update({...task}, {
    //             where: {
    //                 id: task.id
    //             }
    //         });
    //     } catch(err) {
    //         this.logger.error('Error::' + err);
    //     }
    //     return data;
    // }

    // async deleteTask(taskId: string) {
    //     let data = {};
    //     try {
    //         data = await this.db.tasks.destroy({
    //             where: {
    //                 id: taskId
    //             }
    //         });
    //     } catch(err) {
    //         this.logger.error('Error::' + err);
    //     }
    //     return data;
    //     // return {status: `${data.deletedCount > 0 ? true : false}`};
    // }

}

export default new PatientRepository();