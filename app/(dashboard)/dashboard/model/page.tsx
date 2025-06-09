"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Activity,
  Cpu,
  HardDrive,
  TrendingUp,
  Database,
  Zap,
  Shield,
  Copy,
  CheckCircle,
} from "lucide-react"

export default function ModelsPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [serverStats, setServerStats] = useState<{ [key: string]: any }>({})
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  // Generate dynamic server stats
  useEffect(() => {
    const updateStats = () => {
      const models = ["quantum-alpha", "neural-beta", "ensemble-gamma", "lstm-delta", "transformer-epsilon"]
      const newStats: { [key: string]: any } = {}

      models.forEach((model) => {
        newStats[model] = {
          gpu: Math.floor(Math.random() * 30) + 60, // 60-100%
          cpu: Math.floor(Math.random() * 40) + 30, // 30-70%
          memory: Math.floor(Math.random() * 25) + 30, // 30-85%
        }
      })

      setServerStats(newStats)
    }

    updateStats()
    const interval = setInterval(updateStats, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const models = [
    {
      id: "quantum-alpha",
      name: "Quantum Alpha",
      description: "The latest model has demonstrated exceptional performance across BTC, ETH and SOL, generating 260% annual returns.",
      algorithm: "Quantum Neural Networks + Random Forest Ensemble",
      framework: "TensorFlow Quantum + XGBoost",
      gpu: "GPU 4X4090",
      cpu: "CPU X32",
      Memory: "Memory 64G",
      training: {
        dataSources: ["Binance WebSocket", "CoinGecko API", "Twitter Sentiment", "Reddit Analysis"],
        indicators: ["RSI", "MACD", "Bollinger Bands", "Volume Profile", "Order Book Depth"],
        Recommended_Exchanges: ["Binance", "OKX", "Bybit"],
        timeframes: ["1d"],
        trainingPeriod: "btc/usdt，eth/usdt，sol/usdt，bnb/usdt，doge/usdt，pepe/usdt",
      },
      apiUrl: "https://api.bitdca.top/v1/models/quantum-alpha",
      version: "v2.1.3",
      lastUpdate: "2024-01-15",
      requestLimit: 120,
      exchanges: ["Binance", "OKX", "Bybit"],
      accuracy: 87.3,
      sharpeRatio: 2.14,
      maxDrawdown: 8.7,
      backtestPeriods: [
        { period: "2022-01 to 2022-06", image: "/images/placeholder.jpg?height=120&width=200" },
        { period: "2022-07 to 2022-12", image: "/images/placeholder.jpg?height=120&width=200" },
        { period: "2023-01 to 2023-06", image: "/images/placeholder.jpg?height=120&width=200" },
      ],
    },
    {
      id: "neural-beta",
      name: "Neural Beta",
      description: "Deep learning model specialized in trend prediction and momentum analysis",
      algorithm: "LSTM + Transformer Architecture",
      framework: "PyTorch + Hugging Face Transformers",
      gpu: "GPU 2X4090",
      cpu: "CPU X32",
      Memory: "Memory 32G",
      training: {
        dataSources: ["Multiple CEX APIs", "DeFiPulse", "Fear & Greed Index", "Google Trends"],
        indicators: ["EMA", "Stochastic", "Williams %R", "Ichimoku Cloud", "Fibonacci Retracements"],
        Recommended_Exchanges: ["Binance", "OKX", "Bybit"],
        timeframes: ["1d"],
        trainingPeriod: "2019-2024 (5 years historical data)",
      },
      apiUrl: "https://api.bitdca.top/v1/models/neural-beta",
      version: "v1.8.7",
      lastUpdate: "2024-01-12",
      requestLimit: 100,
      exchanges: ["Binance", "Coinbase Pro", "Kraken"],
      accuracy: 84.6,
      sharpeRatio: 1.89,
      maxDrawdown: 12.3,
      backtestPeriods: [
        { period: "2022-01 to 2022-06", image: "/images/placeholder.jpg?height=120&width=200" },
        { period: "2022-07 to 2022-12", image: "/images/placeholder.jpg?height=120&width=200" },
        { period: "2023-01 to 2023-06", image: "/images/placeholder.jpg?height=120&width=200" },
      ],
    },
    {
      id: "ensemble-gamma",
      name: "Ensemble Gamma",
      description: "Multi-model ensemble combining various ML algorithms for robust predictions",
      algorithm: "Gradient Boosting + SVM + Neural Networks",
      framework: "Scikit-learn + CatBoost + LightGBM",
      gpu: "GPU 1X3090",
      cpu: "CPU X32",
      Memory: "Memory 32G",
      training: {
        dataSources: ["Aggregated Exchange Data", "On-chain Metrics", "Whale Alerts", "News Sentiment"],
        indicators: ["ADX", "CCI", "ROC", "Money Flow Index", "Accumulation/Distribution"],
        Recommended_Exchanges: ["Binance", "OKX", "Bybit"],
        timeframes: ["1d"],
        trainingPeriod: "2021-2024 (3 years historical data)",
      },
      apiUrl: "https://api.bitdca.top/v1/models/ensemble-gamma",
      version: "v1.8.1",
      lastUpdate: "2024-01-18",
      requestLimit: 80,
      exchanges: ["Binance", "OKX", "Gate.io"],
      accuracy: 89.1,
      sharpeRatio: 2.31,
      maxDrawdown: 6.8,
      backtestPeriods: [
        { period: "2022-01 to 2022-06", image: "/images/placeholder.jpg?height=120&width=200" },
        { period: "2022-07 to 2022-12", image: "/images/placeholder.jpg?height=120&width=200" },
        { period: "2023-01 to 2023-06", image: "/images/placeholder.jpg?height=120&width=200" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Warning Section - Improved Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">API Rate Limits</h4>
                  <p className="text-sm text-amber-700">
                    Each model has different rate limits (60requests/minute). Exceeding limits will result in
                    temporary throttling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50 border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Market Risk Disclaimer</h4>
                  <p className="text-sm text-red-700">
                    All models are for informational purposes only. Past performance does not guarantee future results.
                    Trade responsibly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Data Freshness</h4>
                  <p className="text-sm text-blue-700">
                    Models use real-time data with 1-5 second latency. During high volatility, response times may
                    increase slightly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Models Grid */}
        <div className="space-y-8">
          {models.map((model) => (
            <Card key={model.id} className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-800">{model.name}</CardTitle>
                    <CardDescription className="text-base mt-2">{model.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {model.version}
                    </Badge>
                    <p className="text-sm text-slate-600">Updated: {model.lastUpdate}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Technical Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-blue-500" />
                      Technical Framework
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <p>
                        <span className="font-medium">Algorithm:</span> {model.algorithm}
                      </p>
                      <p>
                        <span className="font-medium">Framework:</span> {model.framework}
                      </p>
                      <p>
                        <span className="font-medium">trading pair:</span> {model.training.trainingPeriod}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">{model.gpu}</span>
                        <Cpu className="h-4 w-4 text-blue-600" />
                      </div>
                      <Progress value={serverStats[model.id]?.gpu || 0} className="mb-1" />
                      <p className="text-xs text-blue-700">{serverStats[model.id]?.gpu || 0}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">{model.cpu}</span>
                        <Cpu className="h-4 w-4 text-green-600" />
                      </div>
                      <Progress value={serverStats[model.id]?.cpu || 0} className="mb-1" />
                      <p className="text-xs text-green-700">{serverStats[model.id]?.cpu || 0}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-800">{model.Memory}</span>
                        <HardDrive className="h-4 w-4 text-purple-600" />
                      </div>
                      <Progress value={serverStats[model.id]?.memory || 0} className="mb-1" />
                      <p className="text-xs text-purple-700">{serverStats[model.id]?.memory || 0}%</p>
                    </div>
                  </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <Database className="h-4 w-4 text-green-500" />
                      Data Sources & Indicators
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div>
                        <span className="font-medium">Sources:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.training.dataSources.map((source, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Indicators:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.training.indicators.map((indicator, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {indicator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Exchanges:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.training.Recommended_Exchanges.map((exchange, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {exchange}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Timeframes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.training.timeframes.map((timeframe, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {timeframe}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Performance Metrics and Backtest */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-indigo-500" />
                      Backtest Results
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {model.backtestPeriods.map((backtest, idx) => (
                        <div
                          key={idx}
                          className="relative group cursor-pointer"
                          onMouseEnter={() => setHoveredImage(`${model.id}-${idx}`)}
                          onMouseLeave={() => setHoveredImage(null)}
                          onMouseMove={handleMouseMove}
                        >
                          <div className="bg-slate-100 rounded-lg p-1 hover:bg-slate-400 transition-colors min-h-[160px]">
                            <img
                              src={backtest.image || "/images/images.png"}
                              alt={`Backtest ${backtest.period}`}
                              className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-xs text-center mt-1 text-slate-600 truncate">
                              {backtest.period.split(" ")[0]}
                            </p>
                          </div>

                          {/* Large Image Popup */}
                          {hoveredImage === `${model.id}-${idx}` && (
                            <div
                              className="fixed z-50 pointer-events-none"
                              style={{
                                left: mousePosition.x + 10,
                                top: mousePosition.y - 150,
                              }}
                            >
                              <div className="bg-white rounded-lg shadow-2xl border p-4 max-w-md">
                                <img
                                  src={backtest.image || "/placeholder.svg"}
                                  alt={`Backtest ${backtest.period}`}
                                  className="w-full h-48 object-cover rounded mb-2"
                                />
                                <div className="text-center">
                                  <p className="font-semibold text-slate-800">{backtest.period}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      API Configuration
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">API Endpoint:</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyUrl(model.apiUrl)}
                          className="ml-2"
                        >
                          {copiedUrl === model.apiUrl ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <code className="text-xs bg-white p-2 rounded border block overflow-x-auto">{model.apiUrl}</code>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Rate Limit:</span>
                          <p className="text-slate-600">{model.requestLimit}/min</p>
                        </div>
                        <div>
                          <span className="font-medium">Response Time:</span>
                          <p className="text-slate-600">{serverStats[model.id]?.responseTime || 0}ms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
