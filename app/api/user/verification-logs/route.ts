import { NextResponse } from 'next/server'
import { getRecentVerificationLogs } from '@/lib/db/queries'

export async function GET() {
  try {
    const logs = await getRecentVerificationLogs()
    
    // Group by IP and count verifications
    interface IpStat {
      ipAddress: string
      count: number
      latestTimestamp: Date
    }

    const ipStats = logs.reduce<Record<string, IpStat>>((acc, log) => {
      const ip = log.ipAddress || 'Unknown'
      if (!acc[ip]) {
        acc[ip] = {
          ipAddress: ip,
          count: 0,
          latestTimestamp: new Date(0) // Initialize with earliest possible date
        }
      }
      acc[ip].count++
      const currentDate = new Date(log.timestamp)
      if (currentDate > acc[ip].latestTimestamp) {
        acc[ip].latestTimestamp = currentDate
      }
      return acc
    }, {} as Record<string, IpStat>)

    // Convert to array and sort by latest timestamp
    // Sort by latest timestamp descending, then by count descending
    const result = Object.values(ipStats)
      .sort((a, b) => {
        if (b.latestTimestamp.getTime() !== a.latestTimestamp.getTime()) {
          return b.latestTimestamp.getTime() - a.latestTimestamp.getTime() // Newer first
        }
        return b.count - a.count // Higher count first if timestamps equal
      })
      .slice(0, 5) // Get top 5 most active IPs

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch verification logs' },
      { status: 500 }
    )
  }
}
