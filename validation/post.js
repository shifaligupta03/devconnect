const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, {min: 10, max: 100})) {
    errors.text = 'Text needs to between 10 and 100 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text Field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
