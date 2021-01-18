const mongoose = require("mongoose");

//  Your code goes here
const marioSchema = mongoose.Schema({
  name: String,
  weight: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

const marioModel = mongoose.model("mariochar", marioSchema);

module.exports = marioModel;
