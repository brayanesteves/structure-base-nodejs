const express = require('express');
const checkOrigin = require('../middleware/origin');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/authorization');
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

views.get(      '/', getItems);
views.get(   '/:id', getItem)
views.get('/:Rfrnc', getItem);

views.post('/register', createItem);

views.patch(   '/:id', checkOrigin, updateItem);
views.patch('/:Rfrnc', checkOrigin, updateItem);

views.delete(   '/:id', checkOrigin, deleteItem);
views.delete('/:Rfrnc', checkOrigin, deleteItem);

module.exports = views;