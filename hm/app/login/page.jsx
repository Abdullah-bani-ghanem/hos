'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/admin-dashboard')
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">تسجيل الدخول</h1>
        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
        <input
          type="email"
          className="w-full border p-2 mb-3"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">
          دخول
        </button>
      </div>
    </div>
  )
}
