const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user.model')


// if you want to use request
// passport.use(new localStrategy({
//     passReqToCallback:true
// }, async (req, email, password, done) => {

// }))

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            done(null, false, { message: "Email doesnt exist" })
            return
        }

        const isMatch = await user.isPasswordValid(password)
        isMatch ? done(null, user) : done(null, false, 'Password Incorrect')

    } catch (error) {
        done(error)
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});