import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'super-secret'

export function generateToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return null
  }
}
