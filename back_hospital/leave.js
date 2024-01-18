const express = require('express');

const router = express.Router();

const client = require("./connection");
const { ObjectId } = require('mongodb');

let conn = client.db("Hospital").collection('leave');



//Get
router.get('/fetch', async function(req,res){
    let data = await conn.find({}).toArray();
    res.send(data);
});


//Post
router.post('/add', async function(req,res){

    let obj = {
        date : req.body.date,
        reason : req.body.reason,
        id : req.body.id,
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email
    }

    await conn.insertOne(obj);
    res.send("Post of Leave");

});



//Put
router.put('/update/:id', async function(req,res){

    let id = req.params.id;
    let data = await conn.find({}).toArray();

    index = data.findIndex((ele) => ele.id == id);

    await conn.updateOne({_id : new ObjectId(id)}, {$set : {age : req.body.age}});
    res.send("Put of Leave");

});


//Delete
router.delete('/remove/:id', async function(req,res){

    let id = req.params.id;

    await conn.findOneAndDelete({ _id: new ObjectId(id) });
    res.send("Delete of Leave");

});

module.exports = router;