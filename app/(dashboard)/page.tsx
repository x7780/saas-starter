import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Clock, Shield, TrendingUp, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* 英雄区域 */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    智能定投，轻松构建数字资产
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    通过我们的智能定投服务，您可以轻松地定期投资数字市场，降低市场波动风险，实现长期稳健增长。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button size="lg" className="gap-1">
                      开始定投
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      了解更多
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="数字资产定投图表"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">活跃用户</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">¥1亿+</div>
                <div className="text-sm text-muted-foreground">管理资产</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">系统可用性</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">全天候支持</div>
              </div>
            </div>
          </div>
        </section>

        {/* 功能特点 */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">为什么选择我们的定投服务</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  我们提供智能、安全、便捷的数字市场定投解决方案，帮助您实现长期财富增长
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">自动定投</h3>
                  <p className="text-muted-foreground">
                    设置一次，系统自动按您的计划执行定投，无需手动操作，节省您的宝贵时间。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">智能分析</h3>
                  <p className="text-muted-foreground">
                    基于市场数据和历史表现，提供智能分析和投资建议，优化您的投资组合。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">安全保障</h3>
                  <p className="text-muted-foreground">采用银行级安全措施保护您的资金和个人信息，确保交易安全可靠。</p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">灵活策略</h3>
                  <p className="text-muted-foreground">
                    提供多种定投策略选择，可根据您的风险偏好和投资目标进行个性化定制。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">实时监控</h3>
                  <p className="text-muted-foreground">随时查看您的投资组合表现，获取实时市场动态和投资收益分析。</p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">一键提取</h3>
                  <p className="text-muted-foreground">随时一键提取您的资金，灵活管理您的投资，无复杂流程。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 工作原理 */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">定投如何运作</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">简单三步，开启您的智能定投之旅</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">创建账户</h3>
                  <p className="text-muted-foreground">注册账户并完成身份验证，确保您的投资安全可靠。</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">设置定投计划</h3>
                  <p className="text-muted-foreground">
                    选择您感兴趣的数字资产，设定投资金额和频率，定制专属定投计划。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">坐享增长</h3>
                  <p className="text-muted-foreground">系统自动执行您的定投计划，您可以随时查看投资表现和收益分析。</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="gap-1">
                  立即开始
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 用户评价 */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">用户的声音</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">听听我们的用户如何评价我们的定投服务</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "使用这个定投服务已经一年多了，系统非常稳定，操作简单，最重要的是让我养成了良好的投资习惯，资产也在稳步增长。"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">张先生</p>
                    <p className="text-xs text-muted-foreground">IT工程师</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "作为投资新手，这个平台给了我很大帮助。智能分析功能让我更好地了解市场，自动定投功能也让我不用担心错过投资时机。"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">李女士</p>
                    <p className="text-xs text-muted-foreground">市场营销</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "平台的安全性和透明度让我很放心。客户服务也很专业，有任何问题都能得到及时解答。强烈推荐给想要长期投资的朋友。"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">王先生</p>
                    <p className="text-xs text-muted-foreground">金融分析师</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">常见问题</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">关于我们定投服务的常见问题解答</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-12">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">什么是数字市场定投？</h3>
                <p className="text-muted-foreground">
                  数字市场定投是一种投资策略，通过定期投入固定金额购买数字资产，降低市场波动风险，实现长期稳健增长。
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">我需要多少资金才能开始定投？</h3>
                <p className="text-muted-foreground">
                  我们的平台支持低门槛投资，您可以根据自己的经济状况灵活设置投资金额，没有最低限制。
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">如何保障我的资金安全？</h3>
                <p className="text-muted-foreground">
                  我们采用银行级安全措施，包括多重加密、冷热钱包分离存储、多重签名等技术，确保您的资金安全。
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">我可以随时取出我的资金吗？</h3>
                <p className="text-muted-foreground">
                  是的，您可以随时提取您的资金，没有锁定期限制，灵活管理您的投资。
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">如何开始使用定投服务？</h3>
                <p className="text-muted-foreground">
                  只需注册账户，完成身份验证，设置您的定投计划，系统将自动为您执行定投操作。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 行动召唤 */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">开始您的智能定投之旅</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  加入成千上万的投资者，通过智能定投构建您的数字资产
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-1">
                    免费注册
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline">
                    登录账户
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-base font-medium">产品</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:underline">
                    功能特点
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:underline">
                    工作原理
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    安全保障
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">资源</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    投资指南
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    市场分析
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:underline">
                    常见问题
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">公司</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    加入我们
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">法律</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    服务条款
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:underline">
                    免责声明
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="font-bold">智投数字</span>
            </div>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} 智投数字. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
