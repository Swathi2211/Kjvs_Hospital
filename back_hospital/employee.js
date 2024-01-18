const express = require('express');
const router = express.Router();
const client = require('./connection');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../src/profile/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });



let conn = client.db("Hospital").collection('employee');


router.use(express.json());
const cors = require('cors');
router.use(cors());


// Function to generate userId based on job type
const generateUserId = async (jobName) => {
    let prefix = '';

    if (jobName === 'Doctor') {
        prefix = 'DR';
    } else if (jobName === 'Front Desk Officer') {
        prefix = 'FD';
    } else if (jobName === 'HR') {
        prefix = 'HR';
    }

    // Query the database to find the last entered userId with the respective prefix
    const lastUserId = await conn.find({ "job.name": jobName }).sort({ userId: -1 }).limit(1).toArray();
    

    // Extract the numeric part and increment
    const nextCode = lastUserId ? Number(lastUserId[0].userId.slice(prefix.length)) + 1 : 1;

    // Construct the new userId
    const newUserId = `${prefix}${nextCode}`;

    return newUserId;
};


//Get
router.get('/fetch', async function (req, res) {
    let data = await conn.find({}).toArray();
    res.send(data);
});


//Unique
router.get('/unique/:id', async function(req,res){

    let id = req.params.id;
    let data = await conn.find({ userId: id }).toArray();
    res.send(data);

});


//Post
router.post('/add', upload.single('photo'), async function (req, res) {

    const { filename: imageName, originalname: originalName } = req.file;

    const {
        gender,
        fname,
        lname,
        dob,
        currentAddress,
        age,
        permanentAddress,
        job,
        experience,
        password,
        email,
        phone,
        shift,
        blood,
        speciality
    } = req.body;


    // Now, 'name' and 'code' variables contain the values from req.body.job

    const jobObj = JSON.parse(req.body.job);
    const newUserId = await generateUserId(jobObj.name);

    const shiftObj = JSON.parse(req.body.shift);
    const bldObj = JSON.parse(req.body.blood);


    let obj = {
        fname,
        lname,
        dob,
        age,
        currAddr: currentAddress,
        permAddr: permanentAddress,
        job: jobObj,
        userId: newUserId,
        experience,
        password: password ? password : "Kjvs123$",
        email,
        phone,
        shift: shiftObj,
        photos: imageName,
        gender,
        blood: bldObj
    };

    if (speciality !== null) {
        const splObj = req.body.speciality;
        obj.speciality = splObj;
    }




    await conn.insertOne(obj);
    res.send("Post of Employee");

});

// Post many
router.post('/many', async function (req, res) {
    // Iterate through each document in the request body
    const processedData = req.body.map(async (employee) => {
        const jobObj = JSON.parse(employee.job);
        const userId = await generateUserId(jobObj.name);

        return {
            userId: userId,
            ...employee
        };
    });

    // Wait for all promises to resolve
    const resolvedData = await Promise.all(processedData);

    // Insert the processed data into the database
    await conn.insertMany(resolvedData);
    res.send("Many users added successfully");
});



router.post('/photo', async function (req, res) {

    let data = {
        photo: req.body.photo
    }

    await conn.insertOne(photo);
    res.send("Photos uploaded successfully");
})


router.get('/visualizePhoto', async function (req, res) {

    let data = await conn.find({ photos: { $ne: null } }).toArray();
    res.send(data);

})




//Put
router.put('/update/:id', async function (req, res) {
    const id = req.params.id;

    const updatedData = {
        // Specify the fields you want to update
        currAddr: req.body.currAddr,
        permAddr: req.body.permAddr,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
        // ... add other fields as needed
    };

    await conn.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    res.send("Employee Updated Successfully");
});


//Delete
router.delete('/remove/:id', async function (req, res) {

    let id = req.params.id;

    await conn.findOneAndDelete({ _id: new ObjectId(id) });
    res.send("Delete of Employee");

});

module.exports = router;