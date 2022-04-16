const express = require('express');
const checkOrigin = require('../middleware/origin');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/mysql/authorization');
const views   = express.Router();
const connect = require('../../config/mysql');
// Render
views.get('/', (req, res) => {
    try {
        res.render('index');
    } catch(error) {
        console.log(error);
    }
});

views.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch(error) {
        console.log(error);
    }
});

views.get('/register', (req, res) => {
    try {
        res.render('register');
    } catch(error) {
        console.log(error);
    }    
});

views.get(      '/', getItems);
views.get(   '/:id', getItem)
views.get('/:Rfrnc', getItem);

views.post('/register', createItem);
views.post(   '/login', getItem);

views.patch(   '/:id', checkOrigin, updateItem);
views.patch('/:Rfrnc', checkOrigin, updateItem);

views.delete(   '/:id', checkOrigin, deleteItem);
views.delete('/:Rfrnc', checkOrigin, deleteItem);

module.exports = views;