const config          = require('config');
const jwt             = require('jsonwebtoken');
const Joi             = require('joi'); 
const _               = require('lodash');
const {User}          = require('../models/user');
const mongoose        = require('mongoose');
const express         = require('express');
const router          = express.Router();

router.post('/', async (req,res) =>{
   
    const {error}  = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne( {email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
     
    let pass=req.body.password;
    if( !(pass===user.password) )res.status(400).send('Invalid email or password');
    
    const token=user.generateAuthToken();
    res.send(token);
});

function validate(user){
    const schema ={
        email:    Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}


module.exports = router;