const Joi = require('@hapi/joi');

module.exports = Joi.object({
  status: Joi.string()
    .required()
    .messages({
      'any.required': `Status is a required field`,
    }),
  bio: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.min': `Bio must be at least 10 characters`,
      'any.required': `Bio is a required field`,
    }),
  city: Joi.any()
    .when('role', {
      is: 'Employee',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `City cannot be an empty field`,
      'any.required': `City is a required field`,
    }),
  company: Joi.any()
    .when('role', {
      is: 'Employee',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `Company cannot be an empty field`,
      'any.required': `Company is a required field`,
    }),
  province: Joi.any()
    .when('role', {
      is: 'Employee',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `Province cannot be an empty field`,
      'any.required': `Province is a required field`,
    }),
  skills: Joi.any()
    .when('province', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .required()
    .messages({
      'string.empty': `Skills cannot be an empty field`,
      'any.required': `Skills is a required field`,
    }),
  username: Joi.string()
    .required()
    .messages({
      'string.empty': `Username cannot be an empty field`,
      'any.required': `Username is a required field`,
    }),
  headquarters: Joi.any()
    .when('role', {
      is: 'Employer',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `Username cannot be an empty field`,
      'any.required': `Username is a required field`,
    }),
    headquarters: Joi.any()
    .when('role', {
      is: 'Employer',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `HeadQuarters cannot be an empty field`,
      'any.required': `HeadQuarters is a required field`,
    }),
    industryType: Joi.any()
    .when('role', {
      is: 'Employer',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `Industry Type cannot be an empty field`,
      'any.required': `Industry Type is a required field`,
    }),
    companySize: Joi.any()
    .when('role', {
      is: 'Employer',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `Company Size cannot be an empty field`,
      'any.required': `Company Size is a required field`,
    }),
    founded: Joi.any()
    .when('role', {
      is: 'Employer',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': `Founded cannot be an empty field`,
      'any.required': `Founded is a required field`,
    }),
    role: Joi.string()
    .required()
    .messages({
      'any.required': `Role is a required field`,
    }),
});
