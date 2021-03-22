const express = require('express')
const passport = require('passport');
const router = express.Router();

// auth with google
// route localhost:3000/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// google auth callback
// route localhost:3000/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    })

// logout 
// route localhost:3000/auth/logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})


module.exports = router;