"use client"
import { ArrowDown, ArrowUp, PauseCircle, Star, DollarSign } from "lucide-react"
import ReactECharts from "echarts-for-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

// Define types
interface HistoricalData {
  date: string
  open: number
  ahr: number
  change: number
  changePercent: number
  isPositive: boolean
}

interface Metric {
  title: string
  value: string
  change: string
  changePercent: string
  date: string
  isPositive: boolean | null
  isLongTermInvest?: boolean
  score: number
  chartData: [string, number, number][]
}

// Helper to convert historical data
const processChartData = (historicalData: HistoricalData[]) => {
  return historicalData.map((item) => [
    item.date,
    item.open,
    Math.round(item.ahr * 100),
  ])
}

// MetricCard
function MetricCard({ metric }: { metric: Metric }) {
  const getChangeColor = () => {
    if (metric.isPositive === null) return "text-gray-500"
    return metric.isPositive ? "text-green-600" : "text-red-600"
  }

  const formatValue = (value: string) => {
    const num = Number.parseFloat(value.replace(/,/g, ""))
    if (num >= 1000) {
      return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return value
  }

  const getRecommendationDetails = (score: number) => {
    if  (score < 85) {
      return {
        text: "Recommended Buy",
        icon: <ArrowUp className="h-4 w-4 mr-1" />,
        colorClass: "text-green-600",
        riskText: "Low Risk",
      }
    } else if (score < 125) {
      return {
        text: "Pause",
        icon: <PauseCircle className="h-4 w-4 mr-1" />,
        colorClass: "text-gray-500",
        riskText: "Moderate Risk",
      }
    } else {
      return {
        text: "Recommended Sell",
        icon: <ArrowDown className="h-4 w-4 mr-1" />,
        colorClass: "text-red-600",
        riskText: "High Risk",
      }
    }
  }

  const recommendation = getRecommendationDetails(metric.score)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm py-7">
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-semibold text-gray-900 flex items-center">
            {metric.title}
            {metric.isLongTermInvest && <Star className="h-4 w-4 ml-2 text-yellow-500" />}
          </h3>
          <span className={`flex items-center font-semibold text-sm ${recommendation.colorClass}`}>
            {recommendation.icon} {recommendation.text}
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-2xl font-bold text-gray-900">{formatValue(metric.value)}</span>
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {metric.change} ({metric.changePercent})
          </span>
        </div>
      </div>

      <div className="mb-4 mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Today's Evaluation:</span>
          <span className={`font-bold flex items-center ${recommendation.colorClass}`}>
            {metric.score}
            {recommendation.icon}
          </span>
        </div>
        <p className={`text-xs ${recommendation.colorClass} mt-1`}>
          {recommendation.text} ({recommendation.riskText})
        </p>
      </div>

      <div className="h-18 mt-2">
        <ReactECharts
          option={{
            tooltip: {
              trigger: "axis",
              formatter: (params: any) => {
                const rawData = params[0].data.rawData || params[0].data
                return `
                  Date: ${rawData[0]}<br/>
                  Main Value: ${Number(rawData[1]).toFixed(5)}<br/>
                  Reference Value: ${rawData[2] ? Number(rawData[2]).toFixed(2) : "N/A"}
                `
              },
            },
            xAxis: {
              type: "category",
              data: metric.chartData.map((item) => item[0]),
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
              min: () => Math.min(...metric.chartData.map((item) => item[1])) * 0.9,
              max: () => Math.max(...metric.chartData.map((item) => item[1])) * 1.1,
            },
            series: [
              {
                type: "line",
                data: metric.chartData.map((item) => ({
                  value: item[1],
                  name: item[0],
                  rawData: item,
                  itemStyle: {
                    color: item[2] < 85 ? "#00FF00" : item[2] > 120 ? "#FF0000" : "#3398DB",
                  },
                })),
                lineStyle: { color: "#3398DB" },
                symbol: "circle",
                symbolSize: 1.8,
                showAllSymbol: true,
                showSymbol: true,
                label: { show: false },
              },
            ],
          }}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "svg" }}
        />
        <div className="text-xs text-gray-500 text-right mt-1">{metric.date}</div>
      </div>
    </div>
  )
}

// FAQ Section
const faqs = [
  {
    id: "1",
    question: "What is Digital Currency Dollar-Cost Averaging (DCA)?",
    answer:
      "DCA is an investment strategy in which an investor divides the total amount to be invested across periodic purchases of a target asset (e.g., Bitcoin) in an effort to reduce the impact of volatility on the overall purchase. The purchases occur regardless of the asset's price and at regular intervals.",
  },
  {
    id: "2",
    question: "How does this dashboard help with my DCA strategy?",
    answer:
      "This dashboard provides real-time price data and historical charts for various digital currency pairs (e.g., BTC/USDT), helping you monitor market trends relevant to your DCA strategy. While it doesn't execute trades, it offers insights to inform your decisions.",
  },
  {
    id: "3",
    question: "Can I track specific crypto pairs for my DCA?",
    answer:
      "Yes, the dashboard displays a variety of popular digital currency pairs. You can monitor their current prices, daily changes, and historical trends to align with your chosen DCA assets.",
  },
  {
    id: "4",
    question: "What is the difference between 'Buy' and 'Strong Buy'?",
    answer:
      "In a DCA strategy, 'Buy' refers to your standard periodic investment amount. 'Strong Buy' is an optional action where you invest a larger amount, often considered during significant market dips to accelerate accumulation.",
  },
  {
    id: "5",
    question: "Is historical price data available for analysis?",
    answer:
      "Yes, each metric card includes a small historical chart to give you a quick visual overview of the price trend over time, which can be useful for understanding past performance.",
  },
  {
    id: "6",
    question: "Is this platform suitable for beginners in crypto DCA?",
    answer:
      "This dashboard is designed to be user-friendly, providing clear market data. While it doesn't offer financial advice, it can be a helpful tool for both beginners and experienced investors to track their chosen digital assets for DCA.",
  },
]

function FaqSection() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-8">
        <Badge variant="outline" className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          FAQ
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions About Digital Currency DCA
        </h2>
        <p className="text-lg text-gray-600">
          Find answers related to digital currency dollar-cost averaging, market trends, and more.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {faqs.map((faq) => (
          <div key={faq.id} className="flex items-start">
            <div className="flex-shrink-0 mt-1 mr-3">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border border-orange-500 text-orange-500 text-sm font-bold">
                {faq.id}
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{faq.question}</h3>
              <p className="text-gray-700 text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Page
export default function CryptoDashboard() {
  const [cryptoMetrics, setCryptoMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true)
        const [btcRes, ethRes, solRes, bnbRes] = await Promise.all([
          fetch("/python/BTCUSDT.json"),
          fetch("/python/ETHUSDT.json"),
          fetch("/python/SOLUSDT.json"),
          fetch("/python/BNBUSDT.json"),
        ])

        const btcData: HistoricalData[] = await btcRes.json()
        const ethData: HistoricalData[] = await ethRes.json()
        const solData: HistoricalData[] = await solRes.json()
        const bnbData: HistoricalData[] = await bnbRes.json()

        const metrics: Metric[] = []

        const pushMetric = (data: HistoricalData[], title: string, isLongTermInvest = false) => {
          if (!data.length) return
          const latest = data[data.length - 1]
          metrics.push({
            title,
            value: latest.open.toFixed(2),
            change: latest.change.toFixed(2),
            changePercent: latest.changePercent.toFixed(2) + "%",
            date: latest.date,
            isPositive: latest.isPositive,
            isLongTermInvest,
            score: Math.round(latest.ahr * 100),
            chartData: processChartData(data),
          })
        }

        pushMetric(btcData, "BTC/USDT", true)
        pushMetric(ethData, "ETH/USDT")
        pushMetric(solData, "SOL/USDT")
        pushMetric(bnbData, "BNB/USDT")

        setCryptoMetrics(metrics)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptoData()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center px-2 leading-6 py-0 my-[42px]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Daily Dollar-Cost Averaging (DCA) in Crypto:
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-orange-500">BTC, ETH, SOL, BNB,</span>
          <span className="text-gray-900"> and More</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          For digital asset investors: Smart daily DCA with real-time risk monitoring. Join our proven
          strategy—maintaining a flawless 0% loss rate and 100% success rate since 2018.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="container mx-auto px-4 pb-12 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 h-[280px] rounded-xl border border-gray-200 shadow-sm" />
              ))
            : error
              ? <div className="col-span-full text-red-500 text-center">{error}</div>
              : cryptoMetrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection />
      
    </div>
  )
}
