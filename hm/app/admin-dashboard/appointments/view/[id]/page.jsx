'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ViewAppointmentPage() {
  const { id } = useParams()
  const router = useRouter()

  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointments/${id}`)
        const data = await res.json()
        setAppointment(data)
      } catch (error) {
        alert('❌ فشل تحميل تفاصيل الموعد')
        router.push('/admin-dashboard/appointments')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchAppointment()
  }, [id])

  if (loading) return <div className="text-center p-6 text-amber-700">جاري تحميل تفاصيل الموعد...</div>

  if (!appointment) return null

  return (
    <div dir="rtl" className="p-6 bg-amber-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-amber-900 mb-4">تفاصيل الموعد</h1>
        <div className="space-y-4 text-sm text-amber-800">
          <p><strong className="text-amber-900">اسم المريض:</strong> {appointment?.patient?.name}</p>
          <p><strong className="text-amber-900">اسم الطبيب:</strong> {appointment?.doctor?.name}</p>
          <p><strong className="text-amber-900">التاريخ:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong className="text-amber-900">الوقت:</strong> {appointment.time}</p>
          <p><strong className="text-amber-900">الحالة:</strong> {appointment.status || 'غير محددة'}</p>
          <p><strong className="text-amber-900">السبب:</strong> {appointment.reason || 'لا يوجد'}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="text-amber-700 border border-amber-300 px-4 py-2 rounded hover:bg-amber-50"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  )
}
