// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'

// export default function DoctorsPage() {
//   const [doctors, setDoctors] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch('/api/doctors')
//         const data = await res.json()
//         setDoctors(data)
//       } catch (error) {
//         console.error('فشل تحميل الأطباء:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDoctors()
//   }, [])

//   const handleDelete = async (id) => {
//     if (!confirm('هل تريد حذف هذا الطبيب؟')) return
//     try {
//       const res = await fetch(`/api/doctors/${id}`, {
//         method: 'DELETE',
//       })
//       if (res.ok) {
//         setDoctors(prev => prev.filter(doc => doc._id !== id))
//       } else {
//         const err = await res.json()
//         alert(err.error || 'فشل في الحذف')
//       }
//     } catch (err) {
//       console.error('❌ فشل في الحذف:', err)
//     }
//   }

//   return (
//     <div className="p-6 bg-amber-50 min-h-screen" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-amber-900">إدارة الأطباء</h1>
//           <Link href="/admin-dashboard/doctors/new">
//             <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md">
//               + إضافة طبيب
//             </button>
//           </Link>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
//           </div>
//         ) : doctors.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <p className="text-amber-800 text-lg">لا يوجد أطباء حالياً</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-amber-200">
//                 <thead className="bg-amber-100">
//                   <tr>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-amber-900">#</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-amber-900">الاسم</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-amber-900">التخصص</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-amber-900">الهاتف</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-amber-900">الإجراءات</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-amber-100">
//                   {doctors.map((doctor, index) => (
//                     <tr key={doctor._id} className={index % 2 === 0 ? 'bg-amber-50' : ''}>
//                       <td className="px-6 py-4">{index + 1}</td>
//                       <td className="px-6 py-4 font-medium">{doctor.name}</td>
//                       <td className="px-6 py-4">{doctor.specialty}</td>
//                       <td className="px-6 py-4 font-mono">{doctor.phone}</td>
//                       <td className="px-6 py-4 flex space-x-2 space-x-reverse">
//                         <Link href={`/admin-dashboard/doctors/edit/${doctor._id}`}>
//                           <button className="text-amber-600 hover:text-amber-800">تعديل</button>
//                         </Link>
//                         <button
//                           className="text-red-600 hover:text-red-800"
//                           onClick={() => handleDelete(doctor._id)}
//                         >
//                           حذف
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
