const express = require('express');

const jwt = require('jsonwebtoken');
const key = require('../utilities/key')

const route = express.Router();
const departmentsRoute = require('./apiRoute/department');
const UserModel = require('../models/user');

route.use('/departments',departmentsRoute);

route.post('/signin', (req, res) => {
    console.log(req.body);
    const currentUser = new UserModel();
    const isLogin = currentUser.signIn(req.body.username, req.body.password);
    if(isLogin){
        const token = jwt.sign({data: isLogin}, key);
        res.status(200).send(token);
    }
    else{
        res.status(403).send("Fail to Authenticate")
    }
});

module.exports = route;

