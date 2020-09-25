const config= require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users');
const auth  = require('./routes/auth');
const admin = require('./routes/admin');

if( !config.get('jwtPrivateKey') ){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then( ()=>console.log('Connected to MongoDB...'))
    .catch( err=>console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/admin',admin);

const port  = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server started at http://localhost:${port}...`))