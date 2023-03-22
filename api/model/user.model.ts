import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: { STRING: any; DATE: any; }, Model: any) => {

    class Users extends Model {}

    Users.init({
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        // createdate: {
        //   type: DataTypes.DATE
        //   // allowNull defaults to true
        // },
        // updateddate: {
        //     type: DataTypes.DATE
        //     // allowNull defaults to true
        // }
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'users' // We need to choose the model name
      });
      
      return Users;
}