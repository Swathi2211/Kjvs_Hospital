const express = require('express');

const router = express.Router();

const client = require("./connection");
const { ObjectId } = require('mongodb');

let conn = client.db("Hospital").collection('attendance');



//Get
router.get('/fetch', async function(req,res){
    let data = await conn.find({}).toArray();
    res.send(data);
});


//Get
router.get('/uniquedate', async function(req,res){

    let data = await conn.find({}).toArray();
    data = data.filter((e)=>e.date === new Date().toLocaleDateString());
    res.send(data);

});


//Post
router.post('/add', async function(req,res){

    let obj = {
        name : req.body.name,
        id : req.body.userId,
        date : new Date().toLocaleDateString(),
        In : req.body.in_time,
        Out : req.body.out_time
    }

    await conn.insertOne(obj);
    res.send("Post of Attendance");

});



router.post('/many', async function(req,res){

    let obj = req.body;


    await conn.insertMany(obj);
    res.send("Post of Attendance");

});



//Put
router.put('/update/:id', async function(req,res){

    let id = req.params.id;
    let data = await conn.find({}).toArray();

    index = data.findIndex((ele) => ele.id == id);

    await conn.updateOne({_id : new ObjectId(id)}, {$set : {age : req.body.age}});
    res.send("Put of Attendance");

});


//Delete
router.delete('/remove/:id', async function(req,res){

    let id = req.params.id;

    await conn.findOneAndDelete({ _id: new ObjectId(id) });
    res.send("Delete of Attendance");

});

module.exports = router;