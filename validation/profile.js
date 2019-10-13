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
  city: Joi.string()
    .required()
    .messages({
      'string.empty': `City cannot be an empty field`,
      'any.required': `City is a required field`,
    }),
  company: Joi.string()
    .required()
    .messages({
      'string.empty': `Company cannot be an empty field`,
      'any.required': `Company is a required field`,
    }),
  province: Joi.string()
    .required()
    .messages({
      'string.empty': `Province cannot be an empty field`,
      'any.required': `Province is a required field`,
    }),
  skills: Joi.string()
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
});

// const Validator = require('validator');
// const isEmpty = require('./is_empty');

// module.exports = function validateProfileInput(data) {
//   let errors = {};
//   data.handle = !isEmpty(data.handle) ? data.handle : '';
//   data.status = !isEmpty(data.status) ? data.status : '';
//   data.skills = !isEmpty(data.skills) ? data.skills : '';

//   if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
//     errors.handle = 'Handle needs to between 2 and 40 characters';
//   }

//   if (Validator.isEmpty(data.handle)) {
//     errors.handle = 'Profile handle is required';
//   }

//   if (Validator.isEmpty(data.status)) {
//     errors.status = 'Status is required';
//   }

//   if (Validator.isEmpty(data.skills)) {
//     errors.skills = 'Skills is required';
//   }

//   if (!isEmpty(data.website)) {
//     if (!Validator.isURL(data.website)) {
//       errors.website = 'Not a valid URL';
//     }
//   }
//   if (!isEmpty(data.youtube)) {
//     if (!Validator.isURL(data.youtube)) {
//       errors.youtube = 'Not a valid URL';
//     }
//   }
//   if (!isEmpty(data.twitter)) {
//     if (!Validator.isURL(data.twitter)) {
//       errors.twitter = 'Not a valid URL';
//     }
//   }
//   if (!isEmpty(data.facebook)) {
//     if (!Validator.isURL(data.facebook)) {
//       errors.facebook = 'Not a valid URL';
//     }
//   }
//   if (!isEmpty(data.linkedin)) {
//     if (!Validator.isURL(data.linkedin)) {
//       errors.linkedin = 'Not a valid URL';
//     }
//   }
//   if (!isEmpty(data.instagram)) {
//     if (!Validator.isURL(data.instagram)) {
//       errors.linkedin = 'Not a valid URL';
//     }
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };
