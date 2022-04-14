const { httpError } = require('../helpers/handleError');

const getItems = (req, res) => {
    res.send({ list: [1, 2, 3] });
};

const getItem   = (req, res) => { 

};

const createItem = (req, res) => {
    try {

    } catch (e) {
        httpError(res, e);
    }
};

const updateItem = (req, res) => {

};

const deleteItem = (req, res) => {

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };