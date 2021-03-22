const { body } = require('express-validator')

module.exports = {
    registerValidator: [
        body('email').trim().isEmail().withMessage('Provide a valid email').normalizeEmail().toLowerCase(),
        body('password').trim().isLength(2).withMessage('Password must be of min 2 chars'),
        body('password2').trim().custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
    ]
}