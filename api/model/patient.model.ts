import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: { STRING: any; DATE: any; }, Model: any) => {

    class Patient extends Model {}

    Patient.init({
        // Model attributes are defined here
        // id: {
        //   type: DataTypes.STRING,
        //   primaryKey: true,
        //   allowNull: false
        // },
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
        createdat: {
          type: DataTypes.DATE
          // allowNull defaults to true
        },
        updatedat: {
            type: DataTypes.DATE
            // allowNull defaults to true
        }
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'patient' // We need to choose the model name
      });
      
      return Patient;
}