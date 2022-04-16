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
    try {
        let date = new Date();
        let hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const { username, password } = req.body;
        if(!username || !password) {
            res.render('login', {
                            alert: true,
                       alertTitle: 'Warning',
                     alertMessage: 'Enter username and password',
                        alertIcon: 'info',
                showConfirmButton: true,
                            timer: false,
                             ruta: 'login'
            });
        } else {
            connect.query("SELECT * FROM `0_Usrs` WHERE `Usrnm` = ?", [username], async (error, results) => {
                if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                    res.render('login', {
                                alert: true,
                           alertTitle: 'Error',
                         alertMessage: 'Username and/or password incorrect',
                            alertIcon: 'error',
                    showConfirmButton: true,
                                timer: false,
                                 ruta: 'login'
                    });
                } else {
                    const Reference = results[0].Rfrnc;
                    const Token = jwt.sign({ Rfrnc: Reference },
                        process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRATION
                    });
                    /**
                     * [Optional]
                     * Generate 'token' without 'date' expiration
                     */
                    const tokenWithoutDateExpiration = jwt.sign({ Rfrnc: Reference },
                        process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRATION
                    });

                    const cookiesOptions = {
                         expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRATION * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    };
                    res.cookie('jwt', Token, cookiesOptions);
                    res.render('login', {
                                alert: true,
                           alertTitle: 'Connect successful',
                         alertMessage: '¡Login successful!',
                            alertIcon: 'success',
                    showConfirmButton: false,
                                timer: 800,
                                 ruta: ''
                    });
                }
            });
        }
    } catch (e) {
        httpError(res, e);
    }
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