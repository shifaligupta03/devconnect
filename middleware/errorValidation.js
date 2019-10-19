module.exports = schema =>
  function validate(req, res, next) {
    let errors = {};
    const {error} = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      errors: {label: 'key'},
    });
    if (error) {
      errors = error.details.reduce(function(errorObj, err) {
        errorObj[err.context.key] = err.message;
        return errorObj;
      }, {});
      return res.status(404).json(errors);
    }
    return next();
  };
