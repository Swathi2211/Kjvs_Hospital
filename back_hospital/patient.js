const express = require('express');

const router = express.Router();

const client = require("./connection");
const { ObjectId } = require('mongodb');

let conn = client.db("Hospital").collection('patient');




//Get
router.get('/fetch', async function(req,res){
    let data = await conn.find({}).toArray();
    res.send(data);
});


//Get Unique
router.get('/unique/:id', async function(req,res){

    let id = req.params.id;
    let data = await conn.find({ id: id }).toArray();
    res.send(data);

});


//Post
router.post('/add', async function(req,res){

    let obj = {
        id : req.body.id,
        name : req.body.name,
        dob : req.body.dob,
        age : req.body.age,
        bp : req.body.bp,
        bt : req.body.bt,
        height : req.body.height,
        weight : req.body.weight,
        bmi : req.body.bmi,
        prescription : req.body.prescription,
        test : req.body.test,
        nextDate : req.body.nextDate,
        doctor : req.body.doctor,
        docId : req.body.doctorId,
        speciality : req.body.speciality,
        dPh : req.body.dPh,
        dEmail : req.body.dEmail,
        todayDate : req.body.todayDate
    }

    await conn.insertOne(obj);
    res.send("Post of Patient");

});



//Put
router.put('/update/:id', async function(req,res){

    let id = req.params.id;
    let data = await conn.find({}).toArray();

    index = data.findIndex((ele) => ele.id == id);

    await conn.updateOne({_id : new ObjectId(id)}, {$set : {age : req.body.age}});
    res.send("Put of Patient");

});


//Delete
router.delete('/remove/:id', async function(req,res){

    let id = req.params.id;

    await conn.findOneAndDelete({ _id: new ObjectId(id) });
    res.send("Delete of Patient");

});

module.exports = router;