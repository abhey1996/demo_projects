const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    create,
    getById,
    update
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { username, ...userWithoutUsername } = user.toObject();
        const token = jwt.sign({ sub: user.id }, 'abhinav');
        // console.log(...userWithoutHash);

        return {
            ...userWithoutUsername,
            token
        };
    }
}

async function getAll(userParam) {
    return await User.find().select('-hash');
    // console.log(user);
}

async function getById(userParam) {
    return await User.find({ username: userParam }).select('-hash');
}

async function update(id, userParam) {

    const user = await User.findOne({ username: id });

    if (!user) {
        return "user not found";
    }
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    console.log(userParam.username);
    Object.assign(user, userParam);
    console.log(user);
    await user.save();
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
        // console.log(user.hash);
    }

    await user.save();
}