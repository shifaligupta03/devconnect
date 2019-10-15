const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    date:{
        type:Date,
        default: Date.now()
    },
    role:{
        type: String,
    },

});

UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports= User = mongoose.model('users', UserSchema);