const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
   image:String
  },
  {
    collection: "photos",
  }
);

mongoose.model("photos", ImageDetailsScehma);