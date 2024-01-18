let {MongoClient} = require('mongodb');

let url = "mongodb://0.0.0.0:27017/";

let client = {};

try{
    client = new MongoClient(url);
    console.log("Mongodb connected Successfully");
}catch(err){
    console.log(err);
    console.log("Error establishment");
}

module.exports = client;