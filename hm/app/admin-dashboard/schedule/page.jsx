'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // بيانات وهمية لجدولة أطباء
  const fakeSchedule = {
    '2025-04-10': ['10:00 ص - د. سارة', '1:00 م - د. أحمد'],
    '2025-04-11': ['11:00 ص - د. منى'],
    '2025-04-12': ['9:00 ص - د. سامي', '2:00 م - د. ليلى'],
  }

  const formattedDate = selectedDate.toISOString().split('T')[0]
  const scheduleForDay = fakeSchedule[formattedDate] || []

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">جدول مواعيد الأطباء</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">اختر التاريخ</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="ar-EG"
            calendarType="gregory"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            المواعيد المتاحة لـ {formattedDate}
          </h2>
          {scheduleForDay.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {scheduleForDay.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">لا توجد مواعيد في هذا اليوم.</p>
          )}
        </div>
      </div>
    </div>
  )
}
