const express = require('express');

const jwt = require('jsonwebtoken');
const key = require('../utilities/key')

const route = express.Router();
const departmentsRoute = require('./apiRoute/department');

route.use('/departments',departmentsRoute);

route.use('/auth', require('./apiRoute/auth'));

module.exports = route;