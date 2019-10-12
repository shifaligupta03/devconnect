const Joi = require('@hapi/joi');

module.exports = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email is invalid`,
        'any.required': `Email is a required field`
    }),
    password:Joi.string().required().messages({
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`
    })
});



// const Validator = require('validator');
// const isEmpty = require('./is_empty') ;

// module.exports = function validateLoginInput(data){
//     let errors ={};
//     data.email = !isEmpty(data.email) ? data.email : '';
//     data.password = !isEmpty(data.password) ? data.password : '';

//     if(!Validator.isEmail(data.email)){
//         errors.email = "Email is invalid"
//     }

//     if(Validator.isEmpty(data.email)){
//         errors.email = "Email is required"
//     }

//     if(Validator.isEmpty(data.password)){
//         errors.password = "Password is required"
//     }

//     return {
//         errors,
//         isValid: isEmpty(errors)
//     }
// }