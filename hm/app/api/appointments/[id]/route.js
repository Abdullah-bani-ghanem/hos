import { connectDB } from '../../../lib/db'
import Appointment from '../../../models/Appointment'

export async function GET(req, { params }) {
    await connectDB()
  
    try {
      const appointment = await Appointment.findById(params.id)
        .populate('doctor')
        .populate('patient')
  
      if (!appointment) {
        return Response.json({ error: 'الموعد غير موجود' }, { status: 404 })
      }
  
      return Response.json(appointment)
    } catch (error) {
      console.error('❌ Error fetching appointment:', error)
      return Response.json({ error: 'حدث خطأ أثناء تحميل الموعد' }, { status: 500 })
    }
  }
  

export async function PUT(req, { params }) {
  try {
    await connectDB()
    const data = await req.json()
    const updated = await Appointment.findByIdAndUpdate(params.id, data, { new: true })

    if (!updated) {
      return Response.json({ error: 'Appointment not found' }, { status: 404 })
    }

    return Response.json(updated)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()
    const deleted = await Appointment.findByIdAndDelete(params.id)

    if (!deleted) {
      return Response.json({ error: 'Appointment not found' }, { status: 404 })
    }

    return Response.json({ message: 'Appointment deleted' })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
