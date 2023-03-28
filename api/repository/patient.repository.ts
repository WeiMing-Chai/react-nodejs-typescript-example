// import connect from '../config/db.config';
import prisma from "../prisma/prisma";
import { Logger } from "../logger/logger";


class PatientRepository {

    public logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    async getPatients() {
        
        try {
            const patients = await prisma.patients.findMany();
            console.log('patients:::', patients);
            return patients;
        } catch (err) {
            console.log(err);
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
        } catch(err) {
            this.logger.error('Error::' + err);
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