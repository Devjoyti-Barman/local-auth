const admin =require('../middleware/auth');
const config          = require('config');
const jwt             = require('jsonwebtoken');
const Joi             = require('joi'); 
const _               = require('lodash');
const {User}          = require('../models/user');
const mongoose        = require('mongoose');
const express         = require('express');
const router          = express.Router();

router.post('/',admin, async (req,res) =>{
   
    return res.status(200).send('WORK FINE');
    
});



module.exports = router;