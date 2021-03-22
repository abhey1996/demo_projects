const router = require('express').Router();
const { required } = require('@hapi/joi');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../validation');




//@desc register new user
//@route POST /api/user/register
router.post('/register', async (req, res) => {

    //validate the data
    const { error } = validateRegister(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //duplicate email check
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("email already exists");

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        let userCreated = await user.save();
        res.send({ user: user.name })
    } catch (error) {
        res.sendStatus(400).send(error)
    }

})

//@desc login user
//@route POST /api/user/login
router.post('/login', async (req, res) => {
    //validate the data
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check email of user
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("email not found");

    //check password
    const checkPass = await bcrypt.compare(req.body.password, user.password)
    if (!checkPass) return res.status(400).send("password incorrect");

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    res.header("auth-token", token).send(token)

})

module.exports = router;