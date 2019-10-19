const Joi = require('@hapi/joi');

module.exports = Joi.object({
  text: Joi.string()
    .min(10)
    .max(100)
    .required()
    .messages({
      'string.empty': `Text cannot be an empty field`,
      'any.required': `Text is a required field`,
      'string.min': `Text needs to between 10 and 100 characters`,
    })
});