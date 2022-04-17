const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcryptjs          = require('bcryptjs');
const connect           = require('../../../config/mysql');
const { httpError }     = require('../../helpers/handleError');


const getUsers = async (req, res) => {
    try {
        console.log(req.body)
	const { username, password } = req.body
	const values = [username, password]
	connect.query("SELECT * FROM 0_Users", values, (err, result) => {
		if (err) {
			console.log("ACA")
			res.status(500).send(err)
		} else {
			console.log("ACA 1")
			if (result.length > 0) {
				console.log("ACA 2")
				res.status(200).send({
					"Rfrnc": result[0].Rfrnc,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connect.end()
    } catch (e) {
        httpError(res, e);
    }
};

const getUser  = (req, res) => { 
    try {
        const { params_id } = req.params
	console.log(req.params.id);
	const values = [req.params.id]
	connect.query("SELECT * FROM 0_Users WHERE Rfrnc = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"Rfrnc": req.params.id,
					"name": result[0].name,
					"username": result[0].username,
					"typeuser": result[0].typeuser,
					"gender": result[0].gender,
					"email": result[0].email,
					"password": result[0].password,
					"terminos": result[0].terminos,
					"edad": result[0].edad,
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
    } catch (e) {
        httpError(res, e);
    }
};

const signup = async (req, res) => {
    try {
        
    } catch (e) {
        httpError(res, e);
    }
};

const signin = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(req.body)
	const values = [username, password]
        connect.query("SELECT * FROM 0_Users WHERE username = ? AND password = ?", values, (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                if (result.length > 0) {
                    res.status(200).send({
                        "Rfrnc": result[0].Rfrnc,
                        "username": result[0].username
                    })
                } else {
                    res.status(400).send('Usuario no existe')
                }
            }
        });
    } catch (e) {
        httpError(res, e);
    }
};

const editUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

const sendEmail = (req, res) => {
    console.log(req.body);
    let { reference, email, title, message, classification } = req.body
    let values = [reference, title, message, classification]
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "deja.bosco7@ethereal.email",
            pass: "DSk68MSwWU5EQMQhKr"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOption = {
        form: "Test",
        to: email,
        subject: title,
        html: message
    };

    transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            res.status(500).send();
        } else {
            console.log("Send successful");            
            connect.query("INSERT INTO 0__MssgEmls SET ?", {Rfrnc_Usrs:reference, Ttl:title, Mssg:message, Clssfctn:classification, Cndtn:1, Rmvd:0, Lckd:0, DtAdmssn:"0001-01-01", ChckTm:"00:00:00"}, (err, result) => {
                
                if (err) {
                    res.status(500).send(err)
                } else {
                    //console.log(result[0].name)
                    //if (result.length > 0) {
                        res.status(200).send({ message: "Successful"})
                    //} else {
                    //	res.status(400).send('Usuario no existe')
                    //}
                }
            })
            //res.send(200).json(req.body);
        }
    });
};


/**
 *  ================================
 * |        Request 'Views'         |
 *  ================================
 */
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

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getUsers, getUser, signup, signin, editUser, deleteUser, sendEmail };