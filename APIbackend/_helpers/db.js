const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    host = "localhost"
    const { port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    //const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    //const sequelize = new Sequelize('mysql://cpp3560:$slumL0rdM1llionair3!@edwin-dev.com:3306/cpp3560');
    const sequelize = new Sequelize('mysql://root:Shashi@123@localhost:3306/WebAMS');


    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Unit = require('../listings/listing.model')(sequelize);
    // sync all models with database
    await sequelize.sync();
}