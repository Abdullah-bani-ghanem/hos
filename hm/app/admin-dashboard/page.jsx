'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalProviders: 0,
    totalAppointments: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // بيانات وهمية
    const fakeStats = {
      totalUsers: 120,
      totalPatients: 80,
      totalProviders: 30,
      totalAppointments: 50,
      totalRevenue: 25000,
    }

    // محاكاة تحميل البيانات من الخادم
    setTimeout(() => {
      setData(fakeStats)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="min-h-screen bg-amber-50" dir="rtl">
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-amber-900 text-3xl font-bold">لوحة تحكم الإدارة</h1>
          <p className="text-amber-700 mt-2">مرحباً بك في نظام إدارة العيادة</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <DashboardCard 
                title="إجمالي المستخدمين" 
                value={data.totalUsers} 
                icon="👥"
                color="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <DashboardCard 
                title="عدد المرضى" 
                value={data.totalPatients} 
                icon="🏥"
                color="bg-gradient-to-br from-amber-500 to-amber-600"
              />
              <DashboardCard 
                title="مقدمي الرعاية" 
                value={data.totalProviders} 
                icon="👨‍⚕️"
                color="bg-gradient-to-br from-green-500 to-green-600"
              />
              <DashboardCard 
                title="المواعيد" 
                value={data.totalAppointments} 
                icon="📅"
                color="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <DashboardCard 
                title="الإيرادات ($)" 
                value={`$${data.totalRevenue.toLocaleString()}`} 
                icon="💰"
                color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 col-span-2">
                <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span> الإحصائيات الأخيرة
                </h2>
                <div className="h-64 flex items-center justify-center text-amber-700">
                  هنا يمكن عرض رسم بياني للإحصائيات
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center">
                  <span className="mr-2">🔔</span> آخر التنبيهات
                </h2>
                <ul className="space-y-3">
                  <AlertItem text="موعد جديد تم تحديده" time="منذ 5 دقائق" />
                  <AlertItem text="تم تسجيل مريض جديد" time="منذ 2 ساعة" />
                  <AlertItem text="تقرير جديد جاهز للمراجعة" time="منذ 6 ساعات" />
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <QuickLinkCard 
                title="إدارة المرضى" 
                icon="🏥"
                description="عرض وإدارة سجلات المرضى" 
                linkText="عرض المرضى"
                href="/admin-dashboard/patients"
              />
              <QuickLinkCard 
                title="المواعيد" 
                icon="📅"
                description="جدولة وإدارة المواعيد" 
                linkText="فتح التقويم"
                href="/admin-dashboard/appointments"
              />
              <QuickLinkCard 
                title="التقارير" 
                icon="📊"
                description="الوصول إلى تقارير النظام" 
                linkText="عرض التقارير"
                href="/admin-dashboard/reports"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden">
      <div className={`${color} p-6 text-white`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white text-sm opacity-90 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="text-3xl opacity-80">{icon}</div>
        </div>
      </div>
    </div>
  )
}

function AlertItem({ text, time }) {
  return (
    <li className="flex items-center justify-between border-b border-amber-100 pb-2">
      <span className="text-amber-800">{text}</span>
      <span className="text-xs text-amber-600">{time}</span>
    </li>
  )
}

function QuickLinkCard({ title, icon, description, linkText, href }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
      </div>
      <p className="text-amber-700 text-sm mb-4">{description}</p>
      <Link href={href} className="mt-auto">
        <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition duration-200 text-sm">
          {linkText}
        </button>
      </Link>
    </div>
  )
}