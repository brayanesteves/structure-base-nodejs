const express = require('express');
const views   = express.Router();
const connect = require('../../config/mysql');

// Render
views.get('/', (req, res) => {
    
    res.render('index');
});

views.get('/login', (req, res) => {
    res.render('login');
});

views.get('/register', (req, res) => {
    res.render('register');
});


module.exports = views;