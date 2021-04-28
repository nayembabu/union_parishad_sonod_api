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

    // Query for Insert Certificate Default 
    async insert_certificate_default(arrayObj) {
         try {
            const response = await new Promise((resolve, reject) => {
                const query = `INSERT INTO certificate_default_by_user (global_default_certificate_iddi, user_default_certificate_full_description, customer_uniq_priiddii) VALUES (${arrayObj});`;

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
    async getAllUserCertificate() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM certificate_default_by_user;";

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
    async getAllUserCertificateByID(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM certificate_default_by_user WHERE user_certificate_default_iidd = ${id};`;

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

    // Query for Get Last Data by date
    async getAllCertificateByDate(todays_day_format) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query =  `SELECT * 
                                FROM certificate_entry 
                                WHERE cer_entry_date = "${todays_day_format}" 
                                ORDER BY cer_p_iddd DESC 
                                LIMIT 1;`;

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

    // New Certificate Inserted
    async insertNewCertificateData(arrayObj) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `INSERT INTO certificate_entry (set_user_certificate_default_id, cer_entry, cer_title, cer_id_datewise, cer_entry_date, timestamp, person_name, mother_name, ward, vill, post, thana_s, nidorbirth, bn_or_en, approval, in_or_out, customer_person_uniq_id) VALUES (${arrayObj});`;

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

    // Query for Get Certificate by ID
    async getCertificateByID(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query =  `SELECT * 
                                FROM certificate_entry 
                                WHERE cer_p_iddd = ${id};`;

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