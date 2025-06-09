"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Key,
  BarChart3,
  Calendar,
  Activity,
  Shield,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Brain,
  Cpu,
} from "lucide-react"
import { generateApiKey } from "@/lib/utils"

export default function ApiDashboard({ initialApiKey = "" }: { initialApiKey?: string }) {
  const [apiKey, setApiKey] = useState(initialApiKey)
  const [showApiKey, setShowApiKey] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate 30 days of mock data
  const generateMonthlyData = () => {
    const data = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const baseUsage = Math.floor(Math.random() * 800) + 200
      const weekendMultiplier = date.getDay() === 0 || date.getDay() === 6 ? 0.6 : 1
      data.push({
        date: date.toISOString().split("T")[0],
        day: date.getDate(),
        requests: Math.floor(baseUsage * weekendMultiplier),
        errors: Math.floor(Math.random() * 20) + 1,
        avgResponseTime: Math.floor(Math.random() * 100) + 150,
      })
    }
    return data
  }

  const monthlyData = generateMonthlyData()
  const totalRequests = monthlyData.reduce((sum, day) => sum + day.requests, 0)
  const monthlyLimit = 50000
  const usagePercentage = (totalRequests / monthlyLimit) * 100
  const todayUsage = monthlyData[monthlyData.length - 1]?.requests || 0
  const avgDailyUsage = Math.floor(totalRequests / 30)
  const maxDailyRequests = Math.max(...monthlyData.map((d) => d.requests))

  // Model usage data
  const modelUsage = [
    { name: "GPT-4", calls: Math.floor(totalRequests * 0.35), color: "bg-blue-500", icon: Brain },
    { name: "GPT-3.5 Turbo", calls: Math.floor(totalRequests * 0.28), color: "bg-green-500", icon: Cpu },
    { name: "Claude-3", calls: Math.floor(totalRequests * 0.18), color: "bg-purple-500", icon: Brain },
    { name: "Gemini Pro", calls: Math.floor(totalRequests * 0.12), color: "bg-orange-500", icon: Cpu },
    { name: "LLaMA-2", calls: Math.floor(totalRequests * 0.07), color: "bg-red-500", icon: Brain },
  ]

  async function handleRefreshKey() {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/user/refresh-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const { newApiKey } = await response.json()
      setApiKey(newApiKey)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
                    <p className="font-semibold text-slate-800">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Current Plan</p>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                      Free
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Expires On</p>
                    <p className="font-semibold text-slate-800">January 31, 2025</p>
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
              <CardDescription className="text-base">Breakdown of API calls by AI model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {modelUsage.map((model, index) => {
                  const IconComponent = model.icon
                  const percentage = (model.calls / totalRequests) * 100
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${model.color} bg-opacity-10`}>
                            <IconComponent className={`h-4 w-4 ${model.color.replace("bg-", "text-")}`} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{model.name}</p>
                            <p className="text-xs text-slate-500">{percentage.toFixed(1)}% of total calls  API URL:http://api.bitdca.top/v1/monthlyLimit</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{model.calls.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">calls</p>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`${model.color} h-2 rounded-full transition-all duration-700`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>


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
