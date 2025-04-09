'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
    const router = useRouter()

    const handleLogout = () => {
        // حذف التوكن من الكوكي
        document.cookie = 'token=; Max-Age=0; path=/'
        router.push('/login')
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4 border-r border-gray-200 flex flex-col justify-between">
                <div>
                    <h2 className="text-amber-950 text-xl font-bold mb-6">لوحة التحكم</h2>
                    <nav className="flex flex-col gap-4 text-sm">
                        <Link href="/admin-dashboard" className="text-amber-950 hover:text-blue-600">الإحصائيات</Link>
                        <Link href="/admin-dashboard/doctors" className="text-amber-950 hover:text-blue-600"> الأطباء</Link>
                        <Link href="/admin-dashboard/patients" className="text-amber-950 hover:text-blue-600">المرضى</Link>
                        <Link href="/admin-dashboard/appointments" className="text-amber-950 hover:text-blue-600">المواعيد</Link>
                        <Link href="/admin-dashboard/reports" className="text-amber-950 hover:text-blue-600">التقارير</Link>
                        <Link href="/admin-dashboard/billing" className="text-amber-950 hover:text-blue-600">الفواتير</Link>
                        <Link href="/admin-dashboard/feedbacks" className="text-amber-950 hover:text-blue-600">مراجعات المرضى</Link>
                        <Link href="/admin-dashboard/patients/new" className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ إضافة مريض</Link>
                        


                    </nav>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="text-red-600 text-sm hover:underline"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </aside>

            {/* محتوى الصفحة */}
            <main className="flex-1 p-6 bg-gray-50">
                {children}
            </main>
        </div>
    )
}
