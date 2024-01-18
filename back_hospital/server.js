const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());

const emp = require('./employee');
const appoint = require('./appointment');
const patient = require('./patient');
const attend = require('./attendance');
const photos = require('./photos');
const leave = require('./leave');

app.use(express.json());
app.use(express.static('public'));

app.use(express.json());

const client = require("./connection");

app.use('/employee', emp);
app.use('/appoint', appoint);
app.use('/patient', patient);
app.use('/attend', attend);
app.use('/photos', photos);
app.use('/leave', leave);

app.listen(port,()=>{
    console.log("API activated...");
});


