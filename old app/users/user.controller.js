const express = require('express');
const router = express.Router();
const userService = require('./user.service');

//routes
router.post('/authenticate', authenticated);
router.get('/getAll', getAll);
router.post('/create', created);
router.get('/getById/:id', getById);
router.put('/update/:id', update);

module.exports = router;

function authenticated(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: "username of password is incorrect" }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

// localhost:3000/users/getById/abhi
function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function created(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}