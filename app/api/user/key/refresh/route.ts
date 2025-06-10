/**
 * API路由：刷新用户API Key
 * 路径：/api/user/key/refresh
 * 方法：POST
 * 功能：为当前用户生成新的API Key并记录活动日志
 * 返回：{ apiKey: string }
 */
import { NextResponse } from 'next/server'
import { getUser, getTeamForUser } from '@/lib/db/queries'
import { updateUserApiKey } from '@/lib/db/queries'
import { generateApiKey } from '@/lib/utils'
import { db } from '@/lib/db/drizzle'
import { activityLogs } from '@/lib/db/schema'

export async function POST() {
  const user = await getUser()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const newApiKey = generateApiKey()
  await updateUserApiKey(user.id, newApiKey)

  // 记录活动日志
  const team = await getTeamForUser()
  if (team) {
    await db.insert(activityLogs).values({
      teamId: team.id,
      userId: user.id,
      action: 'API_KEY_REFRESH',
      ipAddress: '127.0.0.1', // TODO: 获取真实IP
      timestamp: new Date()
    })
  }

  return NextResponse.json({ apiKey: newApiKey })
}
