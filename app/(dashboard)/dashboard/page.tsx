"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  BarChart3,
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
  ImageIcon,
  Code,
} from "lucide-react"


// 模型信息数据
const modelInfo = [
  {
    name: "GPT-4 Turbo",
    description: "Most capable GPT-4 model with improved instruction following, JSON mode, and function calling.",
    usage: "45.2%",
    apiUrl: "https://api.bitdca.top/v1/chat/completions",
    icon: Brain,
    color: "bg-purple-500",
    status: "Active",
  },
  {
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient model optimized for chat and text completion tasks with great performance.",
    usage: "25.7%",
    apiUrl: "https://api.bitdca.top/v1/chat/completions",
    icon: Zap,
    color: "bg-green-500",
    status: "Active",
  },
  {
    name: "Claude-3 Sonnet",
    description: "Anthropic's balanced model offering strong performance across a wide range of tasks.",
    usage: "18.3%",
    apiUrl: "https://api.bitdca.top/v1/claude/completions",
    icon: MessageSquare,
    color: "bg-blue-500",
    status: "Active",
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
  const [copied, setCopied] = useState(false)
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

  const handleCopyKey = async () => {
    if (!apiKey) return
    try {
      await navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy API key:', error)
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
                          onClick={() => navigator.clipboard.writeText(model.apiUrl)}
                        >
                          <Copy className="h-3 w-3" />
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
                  <Button variant="outline" onClick={handleCopyKey} className="px-4 hover:bg-slate-100">
                    {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
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
      </div>
    </div>
  )
}
