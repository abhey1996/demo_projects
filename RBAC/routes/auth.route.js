const User = require('../models/user.model')
const { validationResult } = require('express-validator')
const passport = require('passport')
const router = require('express').Router()
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login')
const { registerValidator } = require('../utils/validators')

router.get('/login', ensureLoggedOut({ redirectTo: '/' }), (req, res) => {
    res.render('login')
})

router.post('/login', ensureLoggedOut({ redirectTo: '/' }), passport.authenticate('local', {
    // successRedirect: '/user/profile',
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.get('/register', ensureLoggedOut({ redirectTo: '/' }), (req, res) => {
    res.render('register')
})

router.post('/register', ensureLoggedOut({ redirectTo: '/' }), registerValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            })
            res.render('register', { email: req.body.email, messages: req.flash() })
            return
        }
        const { email } = req.body
        const doesExist = await User.findOne({ email })
        if (doesExist) {
            req.flash('error', 'Email already exists')
            res.render('register', { email: req.body.email, messages: req.flash() })
            return;
        }
        const user = new User(req.body)
        await user.save()
        req.flash('success', "User registered successfully, Please login to Proceed")
        res.redirect('/auth/login')
    } catch (error) {
        next(error)
    }
})

router.get('/logout', ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;

// function authCheck(req, res, next) {
//     if (req.isAuthenticated()) {
//         next()
//     } else {
//         res.redirect('/auth/login')
//     }
// }

// function notAuthCheck(req, res, next) {
//     if (req.isAuthenticated()) {
//         res.redirect('back')
//     } else {
//         next()
//     }
// }