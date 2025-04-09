// const mongoose = require("mongoose");

 
// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     if (!process.env.MONGODB_URI) {
//       throw new Error('Add Mongo URI to .env.local')
//     }
//     console.log(" Connected to MongoDB");
//   } catch (error) {
//     console.error(" MongoDB connection failed:", error.message);
//   }
// }

// module.exports = connectDB;


import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('⚠️ يرجى تعريف MONGODB_URI في ملف .env.local')
}

let cached = global.mongoose || { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}

if (!global.mongoose) {
  global.mongoose = cached
}
