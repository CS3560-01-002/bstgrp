const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        first_name: { type: DataTypes.STRING, allowNull: false },
        middle_name: { type: DataTypes.STRING, allowNull: true },
        last_name: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: true },
        dob: { type: DataTypes.STRING, allowNull: false },
        ssn: { type: DataTypes.STRING, allowNull: false },
        drivers_license: { type: DataTypes.STRING, allowNull: false },
        account_type: { type: DataTypes.STRING, allowNull: true },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('user', attributes, options); //changine the string value is the same as
    //changing the table reference value for accessing the data.
}