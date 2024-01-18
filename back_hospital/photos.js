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

let conn = client.db('Hospital').collection('photos');

router.use(express.json());
const cors = require('cors');
router.use(cors());

router.post('/photo', upload.single('image'), async (req, res) => {
  console.log(req.body);
  const { filename: imageName, originalname: originalName } = req.file;

  const { gender } = req.body; // Retrieve gender from the request body

  try {
    await conn.insertOne({ image: imageName, gender: gender });
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get('/visualizePhoto', async (req, res) => {
  try {
    const data = await conn.find({}).toArray();
    res.send(data);
  } catch (error) {
    res.json({ status: error });
  }
});

module.exports = router;
