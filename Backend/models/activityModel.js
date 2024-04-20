const mongoose = require("mongoose");
const activitySchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  phoneNo: {
    type: Number,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  month: {
    type: String,
    require: true
  },
  activityType: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
});
module.exports = mongoose.model("activitydetails", activitySchema);