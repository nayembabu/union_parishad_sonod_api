const mysql = require('mysql');
const dotenv = require('dotenv');

let instance = '';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    post: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    }else {
        console.log('Database Connection Success')
    }
})


class Dbquery {

    static getDbServiceInstance() {
        return instance ? instance : new Dbquery();
    }

    // Query for Get All Global Data
    async getAllGlobalCertificateData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cer_deft;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Query for Get All Global Data
    async getAllGlobalCertificateDataByData(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM cer_deft WHERE cer_def_p_iidi = ${id};`;

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }













}


module.exports = Dbquery;