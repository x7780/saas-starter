/**
 * API路由：获取用户API Key
 * 路径：/api/user/key
 * 方法：GET
 * 功能：获取当前登录用户的API Key
 * 返回：{ apiKey: string }
 */
import { NextResponse } from 'next/server'
import { getUser } from '@/lib/db/queries'
import { getUserApiKey } from '@/lib/db/queries'

export async function GET() {
  const user = await getUser()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const apiKey = await getUserApiKey(user.id)
  return NextResponse.json({ apiKey })
}
