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
    return await db.Listing.findAll();
}

async function getById(id) {
    return await getUnit(id);
}

async function create(params) {
    // validate
    if (await db.Listing.findOne({ where: { unitNo: params.unitNo } })) {
        throw 'Unit Number "' + params.unitNo + '" is already taken';
    }

    // // hash password
    // if (params.password) {
    //     params.hash = await bcrypt.hash(params.password, 10);
    // }

    //handle other logic for updating other unit fields

    // save user
    await db.Listing.create(params);
}

async function update(id, params) {
    const unit = await getUnit(id);

    // validate
    const unitNoChanged = params.unitNo && unit.unitNo !== params.unitNo;
    if (unitNoChanged && await db.Listing.findOne({ where: { unitNo: params.unitNo } })) {
        throw 'Unit "' + params.unitNo + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(unit, params);
    await unit.save();

    return omitHash(unit.get());
}

async function _delete(id) {
    const unit = await getUnit(id);
    await unit.destroy();
}

// helper functions

async function getUnit(id) {
    const unit = await db.Listing.findByPk(id);
    if (!unit) throw 'Listing not found';
    return unit;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}