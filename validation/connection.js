const Joi = require('@hapi/joi');

module.exports = Joi.object({
  connectorId: Joi.string()
    .required()
    .messages({
      'string.empty': `Connector Id cannot be an empty field`,
      'any.required': `connector Id is a required field`,
    }),
  connectionId: Joi.string()
    .required()
    .messages({
      'string.empty': `Connection Id cannot be an empty field`,
      'any.required': `Connection Id is a required field`,
    }),
});
