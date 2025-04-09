// import mongoose from 'mongoose'

// const appointmentSchema = new mongoose.Schema(
//   {
//     patient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     doctor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Doctor',
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'confirmed', 'cancelled', 'completed'],
//       default: 'pending',
//     },
//     notes: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema)




// const appointmentSchema = new mongoose.Schema(
//   {
//     doctor: { type: String, required: true }, // مؤقتًا string
//     patient: { type: String, required: true }, // مؤقتًا string
//     date: { type: String, required: true },
//     time: { type: String, required: true },
//     reason: { type: String },
//     status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
//   },
//   { timestamps: true }
// )




// app/models/Appointment.js
import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String }
  },
  { timestamps: true }
)

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema)

