import { NextResponse } from 'next/server'
import { getRecentVerificationLogs } from '@/lib/db/queries'

export async function GET() {
  try {
    const logs = await getRecentVerificationLogs()
    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch verification logs' },
      { status: 500 }
    )
  }
}
