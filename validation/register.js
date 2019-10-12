const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': `Name cannot be an empty field`,
        'string.min': `Name must be between 2 and 30 characters`,
        'string.max': `Name must be between 2 and 30 characters`,
        'any.required': `Name is a required field`
      }),
    email: Joi.string().email().required().messages({
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email is invalid`,
        'any.required': `Email is a required field`
    }),
    password:Joi.string().min(6).max(30).required().messages({
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password must be between 6 and 30 characters`,
        'string.max': `Password must be between 6 and 30 characters`,
        'any.required': `Password is a required field`
    }),
    password2:Joi.string().required().equal(Joi.ref('password'))
    .messages({
      'any.required': 'Confirm Password is a required field',
      'any.only': 'Confirm Password must be equal to Password'
    })
});