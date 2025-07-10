// app/api/verify/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 完全不检查任何参数，直接返回200
  return NextResponse.json(
    { 
      valid: true,
      message: "License is valid (always)" 
    },
    { status: 200 }
  )
}