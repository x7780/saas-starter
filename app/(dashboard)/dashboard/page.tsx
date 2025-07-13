"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Key,
  CheckCircle,
  Download,
  Star,
  TrendingUp,
  Users,
  Layers,
  FileText,
  BarChart3,
  Globe,
  Terminal,
  Server,
  ExternalLink,
} from "lucide-react"


export default function Component() {
  const [copiedUrls, setCopiedUrls] = useState<Record<string, boolean>>({})
  const [machineCode, setMachineCode] = useState("") // 用于显示已绑定的机器码
  const [inputMachineCode, setInputMachineCode] = useState("") // 用于用户输入新机器码
  const [isBinding, setIsBinding] = useState(false)
  const [userData, setUserData] = useState({
    name: "Loading...",
    plan: "Loading...",
    expires: "Loading...",
  })

  // IP历史记录，按Total Verifications排序
  const ipRecords = [
    {
      ip: "192.168.1.100",
      lastVerification: "2024-01-15 18:45:23",
      totalVerifications: 1250,
    },
    {
      ip: "192.168.1.105",
      lastVerification: "2024-01-14 23:15:41",
      totalVerifications: 890,
    },
    {
      ip: "10.0.0.50",
      lastVerification: "2024-01-13 16:30:12",
      totalVerifications: 340,
    },
    {
      ip: "203.0.113.45",
      lastVerification: "2024-01-12 10:22:15",
      totalVerifications: 156,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user and team data
        const userResponse = await fetch("/api/user")
        const userData = await userResponse.json()
        const teamResponse = await fetch("/api/team")
        const teamData = await teamResponse.json()
        const keyResponse = await fetch("/api/user/key")
        const keyData = await keyResponse.json()

        setUserData({
          name: userData?.name || "Unknown",
          plan: teamData?.planName || "Free",
          expires:
            teamData?.subscriptionStatus === "active"
              ? new Date(teamData.currentPeriodEnd * 1000).toLocaleDateString("en-US")
              : "Not subscribed",
        })
        setMachineCode(keyData.apiKey || "")
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])

  const handleCopyKey = async (modelName: string, text: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      const key = `${modelName}_${text}`
      setCopiedUrls((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => setCopiedUrls((prev) => ({ ...prev, [key]: false })), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleBindMachine = async () => {
    if (!inputMachineCode.trim()) return
    setIsBinding(true)
    try {
      const response = await fetch('/api/user/key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ machineCode: inputMachineCode }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to bind machine')
      }

      if (result.success) {
        alert('Machine code bound successfully!')
        setInputMachineCode('')
        // 重新获取最新的机器码
        const keyResponse = await fetch("/api/user/key")
        const keyData = await keyResponse.json()
        setMachineCode(keyData.apiKey || "")
      }
    } catch (error) {
      console.error("Failed to bind machine:", error)
      alert(`绑定失败: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      setIsBinding(false)
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
        {/* User Subscription */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm font-medium text-slate-600">User</p>
                  <p className="text-xl font-semibold text-slate-800">{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Plan</p>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-800 text-sm px-3 py-1">
                    {userData.plan}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Expires On</p>
                  <p className="text-lg font-semibold text-slate-800">{userData.expires}</p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
                <a href="/pricing">Manage Subscription</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Machine Code Binding - Full Width */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Key className="h-6 w-6 text-blue-500" />
              Machine Code Binding
            </CardTitle>
            <CardDescription className="text-base">
              Bind your machine code to activate the service. Each machine code can only be used on one device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Binding Form */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-slate-600" />
                    <h3 className="font-medium text-slate-800">Enter Machine Code</h3>
                  </div>
                  <div className="space-y-3">
                    <Input
                      id="machine-code"
                      type="text"
                      placeholder="Enter your machine code here..."
                      value={inputMachineCode}
                      onChange={(e) => setInputMachineCode(e.target.value)}
                      className="font-mono text-sm h-12"
                    />
                    <Button
                      onClick={handleBindMachine}
                      disabled={!inputMachineCode.trim() || isBinding}
                      size="lg"
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      {isBinding ? "Binding Machine..." : "Bind Machine Code"}
                    </Button>
                  </div>
                </div>

                {/* Current Binding Info */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Currently Bound Machine</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Machine Code:</span>
                      <code className="bg-white px-2 py-1 rounded border text-green-800 font-mono">
                        {machineCode || "Not bound"}
                      </code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Binding Date:</span>
                      <span className="text-green-800">January 15, 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Status:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* IP History */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-slate-600" />
                  <h3 className="font-medium text-slate-800">Recent Connections (Top 5 IPs)</h3>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium text-slate-600">
                      <div>IP Address</div>
                      <div>Last Verification</div>
                      <div>Tot. Verifs</div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-200">
                    {ipRecords.map((record, index) => (
                      <div key={index} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                        <div className="grid grid-cols-3 gap-4 items-center text-sm">
                          <div>
                            <code className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800">{record.ip}</code>
                          </div>
                          <div className="text-slate-600">{record.lastVerification}</div>
                          <div className="text-slate-600">{record.totalVerifications.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Terminal className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-800">How to Get Machine Code on Linux</p>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p>On Linux servers, use the following command to get your machine ID:</p>
                      <code className="block bg-blue-100 p-2 rounded font-mono text-xs">cat /etc/machine-id</code>
                      <p>
                        This will display a unique identifier for your machine. Copy this value and paste it in the
                        machine code field above.
                      </p>
                      <p className="text-xs">
                        Note: This command works on most Linux distributions including Ubuntu, CentOS, Debian, and RHEL.
                        We recommend using <strong>Debian</strong> for the best performance and stability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Server className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-amber-800">VPS Server Recommendation</p>
                    <div className="text-sm text-amber-700 space-y-2">
                      <p>
                        Please do not use multiple IPs to avoid account suspension. We strongly recommend renting a VPS
                        for stable server operation.
                      </p>
                      <div className="p-2 bg-amber-100 rounded border">
                        <p className="font-medium text-amber-800 mb-1">Recommended Provider:</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Akile.io Hong Kong VPS</span>
                          <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs">
                            $1.40/month
                          </Badge>
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 text-xs h-7 border-amber-300 hover:bg-amber-100 bg-transparent"
                        >
                          <a href="https://akile.io/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit Akile.io
                          </a>
                        </Button>
                      </div>
                      <p className="text-xs">
                        Hong Kong servers provide excellent connectivity and stability for trading applications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
