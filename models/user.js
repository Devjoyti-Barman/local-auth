const jwt      = require('jsonwebtoken');
const config   = require('config');
const Joi      = require('joi');
const mongoose = require('mongoose');


// defining the Schema of users
const userSchema = new mongoose.Schema({
     
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email: {
        type:String,
        required:5,
        maxlength:255,
        unique:true
    },
    password: {

        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    }

    
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign( {_id: this._id},config.get('jwtPrivateKey'));
    return token;
}

const Users = mongoose.model('User',userSchema);

function validateUser(user){
    
    //defining Schema for Joi
    const schema ={
        name:     Joi.string().min(5).max(50).required(),
        email:    Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}

exports.User = Users;
exports.validate = validateUser;