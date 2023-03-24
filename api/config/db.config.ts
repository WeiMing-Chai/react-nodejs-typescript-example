import { Sequelize, Model, DataTypes, Dialect, OperatorsAliases } from "sequelize";
import model from "../model/patient.model";

const connect = () => {

    // TODO: look at env issue
    const hostName = 'localhost';
    const userName = 'postgres';
    const password = "cwmdxd12345*";
    const database = 'test_db';
    const dialect = 'postgres';

    // const hostName = process.env.HOST;
    // const userName = process.env.USER;
    // const password = process.env.PASSWORD;
    // const database = process.env.DB;
    // const dialect = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect as Dialect,
        // operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        },
        define: {
            timestamps: false
        }
    });

    const db = {
        sequelize: sequelize,
        patient: model(sequelize, DataTypes, Model)
    };

    return db;

}

export default connect;