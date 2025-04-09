'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function DoctorDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctors/${id}`)
        if (!res.ok) throw new Error('فشل في تحميل بيانات الطبيب')
        const data = await res.json()
        setDoctor(data)
      } catch (error) {
        alert('❌ لم يتم العثور على بيانات الطبيب')
        router.push('/admin-dashboard/doctors')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDoctor()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-amber-700">
        جاري تحميل بيانات الطبيب...
      </div>
    )
  }

  if (!doctor) return null

  return (
    <div dir="rtl" className="bg-amber-50 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-4">تفاصيل الطبيب</h1>

        <div className="space-y-4 text-amber-800">
          <div>
            <strong>الاسم الكامل:</strong> {doctor.name}
          </div>
          <div>
            <strong>التخصص:</strong> {doctor.specialty}
          </div>
          <div>
            <strong>البريد الإلكتروني:</strong> {doctor.email}
          </div>
          <div>
            <strong>رقم الهاتف:</strong> {doctor.phone}
          </div>
          <div>
            <strong>الوصف:</strong> {doctor.description || 'لا يوجد'}
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 border border-amber-300 rounded-lg text-amber-700 hover:bg-amber-100 transition"
        >
          رجوع
        </button>
      </div>
    </div>
  )
}
