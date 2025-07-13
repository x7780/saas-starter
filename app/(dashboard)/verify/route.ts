import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { verificationLogs } from '@/lib/db/schema';

const validCodes = ['abc123', 'test456', '5ad0f25bdfa74c08b1e3ad6a121ad052']; // 允许的许可证

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  // 提取纯IPv4地址（如果存在IPv6映射）
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }

  if (!code) {
    await db.insert(verificationLogs).values({
      licenseKey: 'none',
      ipAddress: ip,
    });
    return NextResponse.json({ error: '缺少 code 参数' }, { status: 400 });
  }

  if (validCodes.includes(code)) {
    await db.insert(verificationLogs).values({
      licenseKey: code,
      ipAddress: ip,
    });
    return NextResponse.json({ message: '验证成功' }, { status: 200 });
  } else {
    await db.insert(verificationLogs).values({
      licenseKey: code,
      ipAddress: ip,
    });
    return NextResponse.json({ message: '验证失败' }, { status: 400 });
  }
}
