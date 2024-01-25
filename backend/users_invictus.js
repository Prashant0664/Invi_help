const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter the name"],
  },
  email: {
    type: String,
    required: [true, "please enter the email"],
    unique: true,
  },
  college: {
    type: String,
    required: [true, "please enter the college"],
  },
  phone: {
    type: Number,
    required: [true, "please enter the name"],
  },
  status: {
    type: String,
    default: "user",
  },
  eventList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  ],
});
module.exports = mongoose.model("User", userSchema);