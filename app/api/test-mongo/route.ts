import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    return NextResponse.json({ success: true, message: 'Connected to MongoDB!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} 