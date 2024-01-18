const express = require('express');

const router = express.Router();

const client = require("./connection");
const { ObjectId } = require('mongodb');

let conn = client.db("Hospital").collection('appointment');


// Function to generate patient ID
// Function to generate patient ID
const generatePatientId = async (phone) => {

    let prefix = "PAT";

    // Check if the phone number already exists
    const existingPatient = await conn.findOne({ phone: phone });

    if (existingPatient) {
        // If the phone number exists, return the existing patient ID
        return existingPatient.patientId;
    } else {
        // If the phone number is new, generate a new patient ID
        const lastPatient = await conn.find().sort({ patientId: -1 }).limit(1).toArray();

        // Extract the numeric part and increment
        const nextCode = lastPatient ? Number(lastPatient[0].patientId.slice(prefix.length)) + 1 : 1000;

        // Construct the new patient ID
        const newPatientId = `${prefix}${nextCode}`;

        return newPatientId;
    }
};
//Get
router.get('/fetch', async function (req, res) {
    let data = await conn.find({}).toArray();
    res.send(data);
});


//Get Unique
router.get('/unique/:id', async function (req, res) {

    let id = req.params.id;
    let data = await conn.find({}).toArray();
    data = data.filter((e) => e.patientId == id);
    res.send(data);

});


//Post
router.post('/add', async function (req, res) {

    const phone = req.body.phone;
    const newPatientId = await generatePatientId(phone);

    let obj = {
        patientId: newPatientId,
        name: req.body.name,
        dob: req.body.dob,
        phone: req.body.phone,
        email: req.body.email,
        cause: req.body.cause,
        date: req.body.date,
        time: req.body.time,
        doctor: req.body.doctor
    }

    await conn.insertOne(obj);
    res.send("Post of Appointment");

});


// Post many
router.post('/many', async function(req,res){

    let obj = req.body;

    await conn.insertMany(obj);
    res.send("Post of Appointment");

});






//Put
router.put('/update/:id', async function (req, res) {

    let id = req.params.id;
    let data = await conn.find({}).toArray();

    index = data.findIndex((ele) => ele.id == id);

    await conn.updateOne({ _id: new ObjectId(id) }, { $set: { age: req.body.age } });
    res.send("Put of Appointment");

});


//Delete
router.delete('/remove/:id', async function (req, res) {

    let id = req.params.id;

    await conn.findOneAndDelete({ _id: new ObjectId(id) });
    res.send("Delete of Appointment");

});

module.exports = router;