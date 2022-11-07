const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        unitNo: { type: DataTypes.STRING, allowNull: false },
        bedrooms: { type: DataTypes.STRING, allowNull: false },
        bathrooms: { type: DataTypes.STRING, allowNull: false },
        heating: { type: DataTypes.STRING, allowNull: false },
        airCondition: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        cost: { type: DataTypes.STRING, allowNull: false },
        availability: { type: DataTypes.STRING, allowNull: false },
       // hash: { type: DataTypes.STRING, allowNull: false }
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

    return sequelize.define('Unit', attributes, options); //changine the string value is the same as
    //changing the table reference value for accessing the data.
}