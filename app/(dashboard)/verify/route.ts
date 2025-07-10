import { NextRequest, NextResponse } from 'next/server';

const validCodes = ['abc123', 'test456', 'd9bda92937fbdf4ac36107547cb89cb9a874b93449c64c11d841c5ef3bf210c9']; // 允许的许可证

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: '缺少 code 参数' }, { status: 400 });
  }

  if (validCodes.includes(code)) {
    return NextResponse.json({ message: '验证成功' }, { status: 200 });
  } else {
    return NextResponse.json({ message: '验证失败' }, { status: 400 });
  }
}
