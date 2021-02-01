const mongoose = require("mongoose");

//  Your code goes here
const marioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const marioModel = mongoose.model("mario", marioSchema);

module.exports = marioModel;
