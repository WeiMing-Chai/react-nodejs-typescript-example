import connect from '../config/db.config';
import { Logger } from "../logger/logger";


class TaskRepository {

    public logger: Logger;

    // TODO: look at this
    db: any = {
        
    };

    constructor() {
        this.logger = new Logger();

        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getUsers() {
        
        try {
            const users = await this.db.users.findAll();
            console.log('users:::', users);
            return users;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createTask(task: any) {
        let data = {};
        try {
            task.createdate = new Date().toISOString();
            data = await this.db.tasks.create(task);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateTask(task: any) {
        let data = {};
        try {
            task.updateddate = new Date().toISOString();
            data = await this.db.tasks.update({...task}, {
                where: {
                    id: task.id
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId: string) {
        let data = {};
        try {
            data = await this.db.tasks.destroy({
                where: {
                    id: taskId
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
        // return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

export default new TaskRepository();