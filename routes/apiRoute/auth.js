const express = require('express');
const route = express.Router();
const jwt = require("jsonwebtoken");
const key = require('../../utilities/key');
const UserModel = require("../../models/user");

route.post('/signin', (req, res) => {
    console.log(req.body);
    const currentUser = new UserModel();
    currentUser.signIn(req.body.username, req.body.password)
    .then(currentUser => {
        if(currentUser){
            const token = jwt.sign({data: currentUser}, key);
            res.status(200).send(token);
        }
        else{
            res.status(403).send("Fail to Authenticate")
        }
    })
    .catch(err=> {
        res.status(403).send("Fail to Authenticate");        
    });
    
    
});

route.post('/register', (req, res) => {
    const user = new UserModel();
    user.register(req.body.name, req.body.email, req.body.password)
    .then(user => res.send(user))
    .catch(error => {
        console.log(error);
        res.send("Unexpected Error Occured");
    });
});

module.exports = route;