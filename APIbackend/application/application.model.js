const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    credit_score: { type: DataTypes.STRING, allowNull: false },
    income: { type: DataTypes.STRING, allowNull: false },
    unit_id: { type: DataTypes.STRING, allowNull: false },
    employer: { type: DataTypes.STRING, allowNull: false },
    house_mate_count: { type: DataTypes.STRING, allowNull: false },
    vehicle: { type: DataTypes.STRING, allowNull: false },
    applicant_id: { type: DataTypes.STRING, allowNull: false },
    // hash: { type: DataTypes.STRING, allowNull: false }
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("application", attributes, options); //changine the string value is the same as
  //changing the table reference value for accessing the data.
}
