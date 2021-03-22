const router = require('express').Router()

router.get('/profile', (req, res) => {
    const person = req.user
    res.render('profile', { person })
})

module.exports = router;