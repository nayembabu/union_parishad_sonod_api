const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db_config = require('./db_config');

const db = db_config.getDbServiceInstance();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Get All Global Data
app.get('/default-certificate', (request, response) => {
    const result = db.getAllGlobalCertificateData()
    
    result
    .then(data => {
        return response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });
})

// Get All Global Data By ID
app.get('/default-certificate/:id', (request, response) => {
    let id = request.params.id; 

    const result = db.getAllGlobalCertificateDataByData(id)
    
    result
    .then(data => {
        return response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });
   
}) 






app.listen(process.env.SERVERPORT, () => {
    console.log('Server is Running ... ')
});