module.exports = function(errors) {
  return Object.getOwnPropertyNames(errors).reduce(function(errorObj, err) {
    errorObj[err] = errors[err].message;
    return errorObj;
  }, {});
};
