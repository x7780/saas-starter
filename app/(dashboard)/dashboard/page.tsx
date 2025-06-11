"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Key,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Brain,
  Zap,
  MessageSquare,
  Download,
  Star,
  BarChart3,
  TrendingUp,
  Users,
  Layers,
  FileText,
  Activity,
} from "lucide-react"


// 模型信息数据
const modelInfo = [
  {
    name: "GPT-4 Turbo",
    description: "Most capable GPT-4 model with improved instruction following, JSON mode, and function calling.",
    usage: "96.2%",
    apiUrl: "https://api.bitdca.top/v1/chat/1",
    icon: Brain,
    color: "bg-purple-500",
    status: "Active",
  },
  {
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient model optimized for chat and text completion tasks with great performance.",
    usage: "20.7%",
    apiUrl: "https://api.bitdca.top/v1/chat/2",
    icon: Zap,
    color: "bg-green-500",
    status: "Active",
  },
  {
    name: "Claude-3 Sonnet",
    description: "Anthropic's balanced model offering strong performance across a wide range of tasks.",
    usage: "18.3%",
    apiUrl: "https://api.bitdca.top/v1/claude/3",
    icon: MessageSquare,
    color: "bg-blue-500",
    status: "Active",
  },
]

// 策略数据
const strategies = [
  {
    id: "Freqtrade",
    name: "Freqtrade",
    description:
      "A Python-based, open-source crypto trading bot focused on backtesting and live trading with customizable strategies",
    platform: "linux win",
    language: "Python",
    rating: 5,
    downloads: 12453,
    tags: ["Bitcoin", "Coinbase", "OKX", "Kraken", "Bybit", "Bitget"],
    icon: TrendingUp,
    color: "bg-blue-500",
    lastUpdated: "2023-05-15",
    downloadUrl: "https://download.bitdca.top/freqtrade/ahr999_strategy.zip",
    docUrl: "/dashboard/Freqtrade",
  },
  {
    id: "Zenbot",
    name: "Zenbot",
    description: "A lightweight, high-frequency trading bot built in Node.js, optimized for speed and arbitrage.",
    platform: "linux win",
    language: "Node.js",
    rating: 3,
    downloads: 8765,
    tags: ["Bitcoin", "Coinbase", "OKX", "Kraken", "Bybit", "Bitget"],
    icon: BarChart3,
    color: "bg-green-500",
    lastUpdated: "2023-06-22",
    downloadUrl: "https://download.bitdca.top/freqtrade/fear_greed_strategy.zip",
    docUrl: "/doc",
  },
  {
    id: "Hummingbot",
    name: "Hummingbot",
    description: "An open-source market-making and arbitrage bot designed for liquidity provision and earning rewards.",
    platform: "linux win",
    language: "Python",
    rating: 3,
    downloads: 6543,
    tags: ["Bitcoin", "Coinbase", "OKX", "Kraken", "Bybit", "Bitget"],
    icon: Layers,
    color: "bg-purple-500",
    lastUpdated: "2023-07-10",
    downloadUrl: "https://download.bitdca.top/freqtrade/rainbow_strategy.zip",
    docUrl: "/doc",
  },
]

// 模拟30天使用数据
const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  requests: Math.floor(Math.random() * 1000) + 500
}))

const maxDailyRequests = Math.max(...monthlyData.map(d => d.requests))

export default function Component() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [copiedUrls, setCopiedUrls] = useState<Record<string, boolean>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'Loading...',
    plan: 'Loading...',
    expires: 'Loading...'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch API key
        const keyResponse = await fetch('/api/user/key')
        const keyData = await keyResponse.json()
        if (keyData.apiKey) {
          setApiKey(keyData.apiKey)
        }

        // Fetch user and team data
        const userResponse = await fetch('/api/user')
        const userData = await userResponse.json()
        const teamResponse = await fetch('/api/team')
        const teamData = await teamResponse.json()

        setUserData({
          name: userData?.name || 'Unknown',
          plan: teamData?.planName || 'Free',
          expires: teamData?.subscriptionStatus === 'active' 
            ? new Date(teamData.currentPeriodEnd * 1000).toLocaleDateString('zh-CN') 
            : 'Not subscribed'
        })
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  const handleCopyKey = async (modelName: string, text: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      const key = `${modelName}_${text}`
      setCopiedUrls(prev => ({...prev, [key]: true}))
      setTimeout(() => setCopiedUrls(prev => ({...prev, [key]: false})), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleRefreshKey = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/user/key/refresh', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.apiKey) {
        setApiKey(data.apiKey)
      }
    } catch (error) {
      console.error('Failed to refresh API key:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Subscription - Compact */}
        <div className="max-w-full mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm font-medium text-slate-600">User</p>
                    <p className="font-semibold text-slate-800">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Current Plan</p>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                      {userData.plan}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Expires On</p>
                    <p className="font-semibold text-slate-800">{userData.expires}</p>
                  </div>
                </div>
                <Button asChild className="bg-blue-500 hover:bg-blue-600">
                  <a href="/pricing">Manage Subscription</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 30-Day Usage Chart */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Activity className="h-6 w-6 text-blue-500" />
              30-Day Usage History
            </CardTitle>
            <CardDescription className="text-base">Daily API request volume over the past month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-1 h-48 px-2">
                {monthlyData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center justify-end group relative flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer min-h-[4px]"
                      style={{ height: `${Math.max((day.requests / maxDailyRequests) * 100, 2)}%` }}
                    />
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      <div className="font-medium">{day.requests.toLocaleString()} requests</div>
                      <div className="text-gray-300">{new Date(day.date).toLocaleDateString()}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>30 days ago</span>
                <span>15 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Usage Analytics */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BarChart3 className="h-6 w-6 text-blue-500" />
                Model Usage Analytics
              </CardTitle>
              <CardDescription className="text-base">Available AI models and their API endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {modelInfo.map((model, index) => {
                const IconComponent = model.icon
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:shadow-sm transition-all duration-200 bg-white"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${model.color} bg-opacity-10 flex-shrink-0`}>
                        <IconComponent className={`h-4 w-4 ${model.color.replace("bg-", "text-")}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-800 text-sm">{model.name}</h3>
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-0 ${model.status === "Beta" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                          >
                            {model.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">{model.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-800">{model.usage}</div>
                        <div className="text-xs text-slate-500">usage</div>
                      </div>

                      <div className="flex items-center gap-1">
                        <code className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded border max-w-[200px] truncate">
                          {model.apiUrl}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-slate-200 flex-shrink-0"
                          onClick={() => handleCopyKey(model.name, model.apiUrl)}
                        >
                          {copiedUrls[`${model.name}_${model.apiUrl}`] ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* API Key Management */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Key className="h-6 w-6 text-blue-500" />
                API Key Management
              </CardTitle>
              <CardDescription className="text-base">Manage your API authentication key securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="api-key" className="text-sm font-medium">
                  Current API Key
                </Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      id="api-key"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      className="pr-12 font-mono text-sm bg-slate-50"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-slate-200"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => handleCopyKey('API Key', apiKey)} className="px-4 hover:bg-slate-100">
                    {copiedUrls[`API Key_${apiKey}`] ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={handleRefreshKey}
                    disabled={isRefreshing}
                    className="px-4 bg-blue-500 hover:bg-blue-600"
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-800">Security Notice</p>
                    <p className="text-sm text-amber-700">
                      Keep your API key secure and never expose it in client-side code. Refreshing will immediately
                      invalidate the old key.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Key Status</h4>
                      <p className="text-sm text-green-600">Active and valid</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Strategies */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Download className="h-6 w-6 text-blue-500" />
              Trading Strategies
            </CardTitle>
            <CardDescription className="text-base">
              Download our professional trading strategies for various platforms and markets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategies.map((strategy) => {
                const IconComponent = strategy.icon
                return (
                  <Card
                    key={strategy.id}
                    className="overflow-hidden border border-slate-200 transition-all duration-200 hover:shadow-md pt-0"
                  >
                    <div className={`${strategy.color} h-1.5 w-full`}></div>
                    <CardHeader className="p-3 pb-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${strategy.color} bg-opacity-10`}>
                            <IconComponent className={`h-5 w-5 ${strategy.color.replace("bg-", "text-")}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{strategy.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs font-normal">
                                {strategy.platform}
                              </Badge>
                              <Badge variant="outline" className="text-xs font-normal">
                                {strategy.language}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {renderStars(strategy.rating)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-sm text-slate-600 line-clamp-2 h-10">{strategy.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {strategy.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block bg-slate-100 text-slate-700 rounded-full px-2 py-0.5 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex items-center justify-between">
                      <div className="text-xs text-slate-500 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{strategy.downloads.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="border-slate-300 hover:bg-slate-50">
                          <a href={strategy.docUrl}>
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Docs
                          </a>
                        </Button>
                        <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <a href={strategy.downloadUrl} download>
                            <Download className="h-3.5 w-3.5 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
