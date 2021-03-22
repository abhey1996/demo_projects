const Joi = require('@hapi/joi');

function validateRegister(data) {
    const joiSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

    return joiSchema.validate(data)
}
function validateLogin(data) {
    const joiSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

    return joiSchema.validate(data)
}

module.exports = {
    validateRegister,
    validateLogin
};