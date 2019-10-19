const Joi = require('@hapi/joi');

module.exports = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email is invalid`,
        'any.required': `Email is a required field`
    }),
    password:Joi.string().required().messages({
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`
    })
});
