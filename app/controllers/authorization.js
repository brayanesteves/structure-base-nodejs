const jwt               = require('jsonwebtoken');
const bcryptjs          = require('bcryptjs');
const connect           = require('../../config/mysql');
const { httpError }     = require('../helpers/handleError');
const userModel_MongoDB = require('../models/mongodb/users');

const getItems = async (req, res) => {
    try {
        
    } catch (e) {
        httpError(res, e);
    }
};

const getItem   = (req, res) => { 

};

const createItem = async (req, res) => {
    try {
        let date = new Date();
        let hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const { username, password } = req.body;
        let passwordHash = await bcryptjs.hash(password, 8);
        connect.query("INSERT INTO `0_Usrs` SET ?", { Usrnm: username, Psswrd: passwordHash, Rfrnc_Prsn: 1, UsrTyp_Rfrnc: 1, Cndtn: 1, Rmvd: 0, Lckd: 0, DtAdmssn: date.toISOString().split('T')[0], ChckTm: hour }, (error, results) => {
            if (error) { console.log(error); }
            res.redirect('/')
        });
    } catch (e) {
        httpError(res, e);
    }
};

const updateItem = (req, res) => {

};

const deleteItem = (req, res) => {

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };