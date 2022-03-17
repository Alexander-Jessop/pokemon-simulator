const mongoose = require("mongoose");
// Where did these come from? ˅
const { type } = require("os");
const { stringify } = require("querystring");
// Auto generated content ^
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Userprofile = mongoose.model("Userprofile", usersSchema);

module.exports = Userprofile;
