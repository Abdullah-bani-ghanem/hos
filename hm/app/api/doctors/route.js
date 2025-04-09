import { connectDB } from '../../lib/db'
import Doctor from '../../models/Doctor'

export async function GET() {
  try {
    await connectDB()
    const doctors = await Doctor.find().sort({ createdAt: -1 })
    return Response.json(doctors)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    const doctor = await Doctor.create(body)
    return Response.json({ success: true, doctor })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
