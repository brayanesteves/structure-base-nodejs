const { httpError }     = require('../helpers/handleError');
const userModel_MongoDB = require('../models/mongodb/users');

const getItems = async (req, res) => {
    try {
        const listAll = await userModel_MongoDB.find({});        
        res.send({ data: listAll });
    } catch (e) {
        httpError(res, e);
    }
};

const getItem   = (req, res) => { 

};

const createItem = async (req, res) => {
    try {
        const { Usrnm, Psswrd } = req.body;
        const resDetail = await userModel_MongoDB.create({
            Usrnm, Psswrd
        });
        res.send({ data: resDetail });
    } catch (e) {
        httpError(res, e);
    }
};

const updateItem = (req, res) => {

};

const deleteItem = (req, res) => {

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };