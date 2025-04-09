import { NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth'
import cookie from 'cookie'

export async function POST(req) {
  const body = await req.json()

  // بيانات وهمية — استبدل لاحقًا بمستخدمين من قاعدة البيانات
  const adminUser = {
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  }

  if (body.email === adminUser.email && body.password === adminUser.password) {
    const token = generateToken({ email: adminUser.email, role: adminUser.role })

    const res = NextResponse.json({ success: true })
    res.headers.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // أسبوع
      })
    )
    return res
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
