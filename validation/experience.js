const Joi = require('@hapi/joi');

module.exports = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'string.empty': `Title cannot be an empty field`,
            'any.required': `Title is a required field`,
        }),

    from: Joi.string()
        .required()
        .messages({
            'string.empty': `From Date cannot be an empty field`,
            'any.required': `From Date is a required field`,
        }),
    company: Joi.string()
        .required()
        .messages({
            'string.empty': `Company cannot be an empty field`,
            'any.required': `Company is a required field`,
        })
});