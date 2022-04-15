const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST_MYSQL,
    user: process.env.DB_USER_MYSQL,
    password: process.env.DB_PASSWORD_MYSQL,
    database: process.env.DB_DATABASE_MYSQL
});

connection.connect((error) => {
    if(error) {
        console.error("ERROR connect: " + error);
    } else {
        console.log("Connect successful")
    }
});

module.exports = connection;