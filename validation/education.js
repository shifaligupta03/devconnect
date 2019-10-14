const Joi = require('@hapi/joi');

module.exports = Joi.object({
  school: Joi.string()
    .required()
    .messages({
      'string.empty': `School cannot be an empty field`,
      'any.required': `School is a required field`,
    }),

  degree: Joi.string()
    .required()
    .messages({
      'string.empty': `Degree cannot be an empty field`,
      'any.required': `Degree is a required field`,
    }),

  from: Joi.string()
    .required()
    .messages({
      'string.empty': `From Date cannot be an empty field`,
      'any.required': `From Date is a required field`,
    }),
  fieldOfStudy: Joi.string()
    .required()
    .messages({
      'string.empty': `Field of study cannot be an empty field`,
      'any.required': `Field of study is a required field`,
    })
});
