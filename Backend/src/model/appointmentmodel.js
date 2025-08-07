const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Client username
  trainerName: { type: String, required: true }, // Trainer's username
  date: { type: String, required: true },
  slot: { type: String, required: true },
  status: { type: String, default: "Pending" } // Pending | Approved | Rejected
});

module.exports = mongoose.model("Appointment", appointmentSchema);
