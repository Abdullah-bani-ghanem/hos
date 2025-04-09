'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditAppointmentPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    doctor: '',
    patient: '',
    date: '',
    time: '',
    reason: '',
  })

  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentRes, doctorsRes, patientsRes] = await Promise.all([
          fetch(`/api/appointments/${id}`),
          fetch('/api/doctors'),
          fetch('/api/patients/new'),
        ])

        const [appointmentData, doctorsData, patientsData] = await Promise.all([
          appointmentRes.json(),
          doctorsRes.json(),
          patientsRes.json(),
        ])

        setForm(appointmentData)
        setDoctors(doctorsData)
        setPatients(patientsData)
      } catch (err) {
        alert('❌ فشل تحميل البيانات')
        router.push('/admin-dashboard/appointments')
      }
    }

    if (id) fetchData()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        alert('✅ تم تعديل الموعد بنجاح')
        router.push('/admin-dashboard/appointments')
      } else {
        const err = await res.json()
        alert('❌ خطأ: ' + (err.error || 'فشل في تعديل الموعد'))
      }
    } catch (err) {
      alert('❌ فشل الاتصال بالخادم')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-amber-50 min-h-screen" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-900 mb-4">تعديل الموعد</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          {/* اختيار المريض */}
          <div>
            <label className="block mb-1 font-medium text-amber-800">المريض</label>
            <select
              name="patient"
              value={form.patient}
              onChange={handleChange}
              required
              className="w-full p-2 bg-amber-50 border border-amber-300 rounded"
            >
              <option value="">اختر المريض</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* اختيار الطبيب */}
          <div>
            <label className="block mb-1 font-medium text-amber-800">الطبيب</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              required
              className="w-full p-2 bg-amber-50 border border-amber-300 rounded"
            >
              <option value="">اختر الطبيب</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>

          {/* التاريخ والوقت */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-amber-800">التاريخ</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-2 bg-amber-50 border border-amber-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-amber-800">الوقت</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-2 bg-amber-50 border border-amber-300 rounded"
                required
              />
            </div>
          </div>

          {/* السبب */}
          <div>
            <label className="block mb-1 font-medium text-amber-800">سبب الموعد</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="w-full p-2 bg-amber-50 border border-amber-300 rounded"
              rows="3"
            ></textarea>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-amber-700 border border-amber-300 px-4 py-2 rounded"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-amber-600 text-white px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'جاري التعديل...' : 'تعديل الموعد'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
