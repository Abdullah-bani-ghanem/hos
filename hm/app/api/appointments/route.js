import { connectDB } from '../../lib/db'
import Appointment from '../../models/Appointment'

export async function POST(req) {
    try {
      await connectDB()
      const body = await req.json()
      const appointment = await Appointment.create(body)
      return Response.json(appointment)
    } catch (err) {
      console.error('❌ Error creating appointment:', err)
      return Response.json({ error: 'حدث خطأ أثناء إنشاء الموعد' }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      await connectDB()
      const appointments = await Appointment.find().sort({ createdAt: -1 })
      return Response.json(appointments)
    } catch (err) {
      return Response.json({ error: 'حدث خطأ أثناء جلب المواعيد' }, { status: 500 })
    }
  }
