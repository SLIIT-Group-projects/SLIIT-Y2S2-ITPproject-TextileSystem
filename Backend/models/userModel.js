const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  },
});
module.exports = mongoose.model("userdetails", userSchema);