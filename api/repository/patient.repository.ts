// import connect from '../config/db.config';
import prisma from "../prisma/prisma";
import logger from "../logger/logger";


class PatientRepository {

    async getPatients() {
        
        try {
            const patients = await prisma.patients.findMany();
            const information_logged = {
                "user_id": "123",
                "event": "RetrievePatient",
                "outcome": 1,
                "ip_address": "0.0.0.0",
                "application_id": "family_clinic_backend",
                "level": "1",
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

    async createPatient(new_patient: any) {
        let data = {};
        try {
            // new_patient.createdat = new Date().toISOString();
            data = await prisma.patients.create({
                data: new_patient
            });
            const information_logged = {
                "user_id": "123",
                "event": "RegisterPatient",
                "outcome": 1,
                "ip_address": "0.0.0.0",
                "application_id": "family_clinic_backend",
                "level": "1",
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