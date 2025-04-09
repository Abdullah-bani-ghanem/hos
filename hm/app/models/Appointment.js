const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled", "completed"],
    default: "pending",
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);