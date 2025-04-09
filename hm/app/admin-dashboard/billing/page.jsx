'use client'

import { useEffect, useState } from 'react'
import { Search, Plus, DollarSign, RefreshCw, Filter, Download, PieChart, Printer, Eye, ChevronRight, ChevronLeft } from 'lucide-react'

export default function BillingPage() {
  const [bills, setBills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('الكل')
  const [totalAmount, setTotalAmount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // بيانات وهمية للفواتير
    const fakeBills = [
      {
        id: 1,
        patient: 'محمد إبراهيم',
        amount: 120,
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        date: '2025-04-01',
        invoiceNumber: 'INV-20250401-01',
      },
      {
        id: 2,
        patient: 'نجلاء سمير',
        amount: 95,
        method: 'تحويل بنكي',
        status: 'قيد الدفع',
        date: '2025-04-03',
        invoiceNumber: 'INV-20250403-02',
      },
      {
        id: 3,
        patient: 'أحمد يوسف',
        amount: 150,
        method: 'نقدًا',
        status: 'لم يُدفع',
        date: '2025-04-05',
        invoiceNumber: 'INV-20250405-03',
      },
      {
        id: 4,
        patient: 'سارة محمود',
        amount: 85,
        method: 'بطاقة ائتمان',
        status: 'مدفوع',
        date: '2025-04-07',
        invoiceNumber: 'INV-20250407-04',
      },
      {
        id: 5,
        patient: 'خالد عمر',
        amount: 210,
        method: 'نقدًا',
        status: 'لم يُدفع',
        date: '2025-04-08',
        invoiceNumber: 'INV-20250408-05',
      },
    ]

    setTimeout(() => {
      setBills(fakeBills)
      setIsLoading(false)
      // حساب المبلغ الإجمالي
      const total = fakeBills.reduce((sum, bill) => sum + bill.amount, 0)
      setTotalAmount(total)
    }, 300)
  }, [])

  // تصفية الفواتير حسب الحالة وكلمة البحث
  const filteredBills = bills
    .filter(bill => filter === 'الكل' || bill.status === filter)
    .filter(bill => 
      searchTerm === '' || 
      bill.patient.includes(searchTerm) || 
      bill.invoiceNumber.includes(searchTerm)
    )

  const getStatusColor = (status) => {
    switch (status) {
      case 'مدفوع': return 'bg-emerald-100 text-emerald-800 border border-emerald-200'
      case 'قيد الدفع': return 'bg-amber-100 text-amber-800 border border-amber-200'
      case 'لم يُدفع': return 'bg-rose-100 text-rose-800 border border-rose-200'
      default: return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // إحصائيات الفواتير
  const totalPaid = bills.filter(bill => bill.status === 'مدفوع').reduce((sum, bill) => sum + bill.amount, 0)
  const totalPending = bills.filter(bill => bill.status === 'قيد الدفع').reduce((sum, bill) => sum + bill.amount, 0)
  const totalUnpaid = bills.filter(bill => bill.status === 'لم يُدفع').reduce((sum, bill) => sum + bill.amount, 0)

  return (
    <div dir="rtl" className="bg-amber-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* رأس الصفحة */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-900">الفواتير والمدفوعات</h1>
            <p className="text-amber-700 mt-1">إدارة ومتابعة المدفوعات والفواتير</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors shadow-md">
            <Plus size={18} className="ml-2" />
            <span>إضافة فاتورة جديدة</span>
          </button>
        </div>

        {/* نظرة عامة على الفواتير */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-amber-100 p-2 ml-3">
                <DollarSign size={18} className="text-amber-600" />
              </div>
              <h3 className="text-amber-800 font-medium">إجمالي الفواتير</h3>
            </div>
            <p className="text-2xl font-bold text-amber-900">${totalAmount.toFixed(2)}</p>
            <p className="text-xs text-amber-600 mt-1">{bills.length} فواتير</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-emerald-100 p-2 ml-3">
                <DollarSign size={18} className="text-emerald-600" />
              </div>
              <h3 className="text-amber-800 font-medium">مدفوع</h3>
            </div>
            <p className="text-2xl font-bold text-emerald-600">${totalPaid.toFixed(2)}</p>
            <p className="text-xs text-amber-600 mt-1">{bills.filter(b => b.status === 'مدفوع').length} فواتير</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-amber-100 p-2 ml-3">
                <DollarSign size={18} className="text-amber-600" />
              </div>
              <h3 className="text-amber-800 font-medium">قيد الدفع</h3>
            </div>
            <p className="text-2xl font-bold text-amber-600">${totalPending.toFixed(2)}</p>
            <p className="text-xs text-amber-600 mt-1">{bills.filter(b => b.status === 'قيد الدفع').length} فواتير</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-rose-100 p-2 ml-3">
                <DollarSign size={18} className="text-rose-600" />
              </div>
              <h3 className="text-amber-800 font-medium">لم يُدفع</h3>
            </div>
            <p className="text-2xl font-bold text-rose-600">${totalUnpaid.toFixed(2)}</p>
            <p className="text-xs text-amber-600 mt-1">{bills.filter(b => b.status === 'لم يُدفع').length} فواتير</p>
          </div>
        </div>

        {/* أدوات البحث والتصفية */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={18} className="text-amber-400" />
              </div>
              <input
                type="text"
                placeholder="بحث عن فاتورة أو مريض..."
                className="block w-full pr-10 border-amber-200 rounded-lg focus:ring-amber-500 focus:border-amber-500 p-2 bg-amber-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative rounded-lg overflow-hidden">
                <select 
                  className="block w-full appearance-none bg-white border border-amber-200 text-amber-800 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                >
                  <option>الكل</option>
                  <option>مدفوع</option>
                  <option>قيد الدفع</option>
                  <option>لم يُدفع</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-amber-700">
                  <Filter size={14} />
                </div>
              </div>
              
              <button 
                className="bg-amber-100 p-2 rounded-lg hover:bg-amber-200 transition-colors"
                onClick={refreshData}
                title="تحديث البيانات"
              >
                <RefreshCw size={20} className={`text-amber-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button 
                className="bg-amber-100 text-amber-600 p-2 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1 px-3"
                title="تصدير البيانات"
              >
                <Download size={18} />
                <span className="hidden md:inline">تصدير</span>
              </button>
            </div>
          </div>
        </div>

        {/* جدول الفواتير */}
        <div className="bg-white rounded-lg shadow-md border border-amber-100 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
                <p className="mt-2 text-amber-600">جاري تحميل البيانات...</p>
              </div>
            ) : (
              <>
                <div className="px-4 py-2 border-b border-amber-100 flex items-center justify-between bg-amber-50">
                  <span className="text-sm text-amber-700 flex items-center">
                    <PieChart size={16} className="ml-1" />
                    عرض {filteredBills.length} فواتير
                  </span>
                </div>
                <table className="min-w-full text-sm">
                  <thead className="bg-amber-50 text-amber-800">
                    <tr className="text-right">
                      <th className="px-4 py-3 font-medium border-b border-amber-100">#</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">رقم الفاتورة</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">اسم المريض</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">المبلغ ($)</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">طريقة الدفع</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">الحالة</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">التاريخ</th>
                      <th className="px-4 py-3 font-medium border-b border-amber-100">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {filteredBills.length > 0 ? (
                      filteredBills.map((bill, index) => (
                        <tr key={bill.id} className={`hover:bg-amber-50 text-right ${index % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}`}>
                          <td className="px-4 py-3 text-amber-500 font-mono">{bill.id}</td>
                          <td className="px-4 py-3 text-amber-600 font-medium">{bill.invoiceNumber}</td>
                          <td className="px-4 py-3 font-medium text-amber-900">{bill.patient}</td>
                          <td className="px-4 py-3 font-medium text-amber-900">${bill.amount.toFixed(2)}</td>
                          <td className="px-4 py-3 text-amber-700">{bill.method}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(bill.status)}`}>
                              {bill.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-amber-700">{bill.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-end">
                              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                                <Eye size={14} className="ml-1" />
                                عرض
                              </button>
                              <span className="text-amber-200">|</span>
                              <button className="text-amber-600 hover:text-amber-800 font-medium flex items-center">
                                <Printer size={14} className="ml-1" />
                                طباعة
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-amber-600">
                          <div className="flex flex-col items-center">
                            <PieChart size={32} className="mb-2 text-amber-400" />
                            لا توجد فواتير متطابقة مع معايير البحث
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
          
          {/* ترقيم الصفحات */}
          <div className="px-4 py-3 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between bg-amber-50">
            <div className="text-sm text-amber-700 mb-4 sm:mb-0">
              عرض <span className="font-medium">{filteredBills.length}</span> من إجمالي <span className="font-medium">{bills.length}</span> فواتير
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-amber-300 rounded-md bg-white text-amber-700 hover:bg-amber-50 flex items-center">
                <ChevronRight size={16} className="ml-1" />
                السابق
              </button>
              <button className="px-3 py-1 border border-amber-500 rounded-md bg-amber-500 text-white">1</button>
              <button className="px-3 py-1 border border-amber-300 rounded-md bg-white text-amber-700 hover:bg-amber-50 flex items-center">
                التالي
                <ChevronLeft size={16} className="mr-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}