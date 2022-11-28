const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    //authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// async function authenticate({ username, password }) { //authentication only required during login
//     const unit = await db.Listing.scope('withHash').findOne({ where: { username } });

//     if (!user || !(await bcrypt.compare(password, user.hash)))
//         throw 'Username or password is incorrect';

//     // authentication successful
//     const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
//     return { ...omitHash(user.get()), token };
// }

async function getAll() {
    return await db.Maintenance.findAll();
}

async function getById(id) {
    return await getIssue(id);
}

async function create(params) {
    // validate
    // if (await db.Maintenance.findOne({ where: { project_id: params.project_id} })) {
    //     throw 'Project ID "' + params.project_id + '" is already taken';
    // }

    // // hash password
    // if (params.password) {
    //     params.hash = await bcrypt.hash(params.password, 10);
    // }

    //handle other logic for updating other unit fields

    // save ticket
    await db.Maintenance.create(params);
}

async function update(id, params) {
    const maintenance = await getIssue(id);

    // validate
    // const unitNoChanged = params.project_id && maintenance.project_id !== params.project_id;
    // if (unitNoChanged && await db.Unit.findOne({ where: { unit_no: params.unit_no } })) {
    //     throw 'Unit "' + params.unit_no + '" is already taken';
    // } 
    //commenting cuz we don't need to udpdate the project id or other unique fields


    // copy params to user and save
    Object.assign(maintenance, params);
    await maintenance.save();

    //return omitHash(unit.get());
}

async function _delete(id) {
    const maintenance = await getIssue(id);
    await maintenance.destroy();
}

// helper functions

async function getIssue(id) {
    const issue = await db.Maintenance.findByPk(id);
    if (!issue) throw 'Issue not found';
    return issue;
}

// function omitHash(user) {
//     const { hash, ...userWithoutHash } = user;
//     return userWithoutHash;
// }