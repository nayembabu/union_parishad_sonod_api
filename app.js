const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dateFormate = require('dateformat');
const cors = require('cors');
const db_config = require('./db_config');

const now = new Date();

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

// Insert Global Certificate Info By User-id
app.post('/insert-certificate', (request, response) => {

    let arrayObj = (`'${request.body.g_certificate_id}', '${request.body.certificate_des}', '${request.body.userId}'`);

     const result = db.insert_certificate_default(arrayObj)
    
    result
    .then(data => {
        return response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });   
})

// Get User Wise All Certificate 
app.get('/certificate-default', (request, response) => {

    const result = db.getAllUserCertificate()
    
    result
    .then(data => {
        return response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });   
})

// Get User Wise All Certificate 
app.get('/certificate-default/:id', (request, response) => {
    let id = request.params.id; 

    const result = db.getAllUserCertificateByID(id)
    
    result
    .then(data => {
        return response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });   
})

// Get All Certificate By Date 
app.get('/certificate-date', (request, response) => {
    let todays_day_format = dateFormate(now, 'yyyy-mm-dd');
    const result = db.getAllCertificateByDate(todays_day_format)

    result
     .then(data => {
        response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });
})

// New Certificate Issue
app.post('/certificate-issue', (request, response) => {

    let todays_day_format = dateFormate(now, 'yyyy-mm-dd');

    let arrayObj = (`'${request.body.user_default_certificate_id}', '${request.body.certificate_full_des}', '${request.body.certificate_title}', '${request.body.certificate_id_by_date}', '${todays_day_format}', '${request.body.uniqTimestamp}', ${request.body.person_name}, ${request.body.mother_name}, ${request.body.ward}, ${request.body.village}, ${request.body.post}, ${request.body.thana_s}, ${request.body.nidorbirth}, '${request.body.bn_or_en}', '1', '1', '${request.body.userId}'`);    

    const result = db.insertNewCertificateData(arrayObj)

    result
    .then(data => {
        return response.json(data);
    })
    .catch(err => {
        return console.log(err);
    });    
})

// Get Issued Certificate By ID
app.get('/certificate/:id', (request, response) => {
    let id = request.params.id; 

    const result = db.getCertificateByID(id)
    
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