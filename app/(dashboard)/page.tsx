"use client"

import Link from "next/link" // Import Link for navigation
import {
  Twitter,
  Facebook,
  Instagram,
  Send,
  MessageSquare,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  PauseCircle,
  Star,
  DollarSign,
} from "lucide-react" // Import all necessary icons
import ReactECharts from 'echarts-for-react' // Import ECharts component
import { Badge } from "@/components/ui/badge" // Assuming Badge is a shadcn/ui component

// MetricCard Component (moved from components/metric-card.tsx)
interface Metric {
  title: string
  value: string
  change: string
  changePercent: string
  date: string
  isPositive: boolean | null
  isLongTermInvest?: boolean // Added for long-term investment indicator
  score: number // Added for today's evaluation score
}

function MetricCard({ metric }: { metric: Metric }) {
  const currentValueNum = Number.parseFloat(metric.value.replace(/,/g, ""))
  const chartData = generateChartData(currentValueNum)

  const getChangeColor = () => {
    if (metric.isPositive === null) return "text-gray-500"
    return metric.isPositive ? "text-green-600" : "text-red-600"
  }

  const formatValue = (value: string) => {
    const num = Number.parseFloat(value.replace(/,/g, ""))
    if (num >= 1000) {
      return num.toLocaleString()
    }
    return value
  }

  const getYAxisDomain = () => {
    const values = chartData.map((d) => Number(d[1]))
    const min = Math.min(...values)
    const max = Math.max(...values)
    const padding = (max - min) * 0.1
    return [Math.max(0, min - padding), max + padding]
  }

  // New function to determine recommendation based on score
  const getRecommendationDetails = (score: number) => {
    if (score < 40) {
      return {
        text: "Double Buy",
        icon: <DollarSign className="h-4 w-4 mr-1" />, // Using DollarSign for Double Buy
        colorClass: "text-blue-600",
        riskText: "Very Low Risk",
      }
    } else if (score < 85) {
      // score >= 40 and < 85
      return {
        text: "Recommended Buy",
        icon: <ArrowUp className="h-4 w-4 mr-1" />,
        colorClass: "text-green-600",
        riskText: "Low Risk",
      }
    } else if (score < 125) {
      // score >= 85 and < 125
      return {
        text: "Pause",
        icon: <PauseCircle className="h-4 w-4 mr-1" />,
        colorClass: "text-gray-500",
        riskText: "Moderate Risk",
      }
    } else {
      // score >= 125
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
      {/* Header */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-semibold text-gray-900 flex items-center">
            {metric.title}
            {metric.isLongTermInvest && (
              <div className="group relative inline-block">
                <Star className="h-4 w-4 ml-2 text-yellow-500" />
                <span className="absolute z-10 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap -left-1/2 transform translate-x-1/2">
                  Recommended for Long-Term Investment
                </span>
              </div>
            )}
          </h3>
          <span className={`flex items-center font-semibold text-sm ${recommendation.colorClass}`}>
            {recommendation.icon} {recommendation.text}
          </span>
        </div>
      </div>

      {/* Value and Change */}
      <div className="mb-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-2xl font-bold text-gray-900">{formatValue(metric.value)}</span>
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {metric.change} ({metric.changePercent})
          </span>
        </div>
      </div>

      {/* Today's Evaluation */}
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

      {/* Chart */}
      <div className="h-18 mt-2">
            <ReactECharts
            option={{
              // prettier-ignore
              tooltip: {
                trigger: 'axis',
                formatter: function(params: any) {
                  const rawData = params[0].data.rawData || params[0].data;
                  return `
                    Date: ${rawData[0]}<br/>
                    Main Value: ${Number(rawData[1]).toFixed(5)}<br/>
                    Reference Value: ${rawData[2] ? Number(rawData[2]).toFixed(2) : 'N/A'}
                  `;
                }
              },
              xAxis: {
                type: 'category',
                data: chartData.map(item => item[0]),
                show: false
              },
              yAxis: {
                type: 'value',
                show: false,
                min: function(value: number) {
                  const minVal = Math.min(...chartData.map(item => Number(item[1])));
                  return minVal * 0.9; // 留10%下边距
                },
                max: function(value: number) {
                  const maxVal = Math.max(...chartData.map(item => Number(item[1])));
                  return maxVal * 1.1; // 留10%上边距
                }
              },
              series: [{
                type: 'line',
                data: chartData.map(item => ({
                  value: item[1],
                  name: item[0],
                  rawData: item,
                  itemStyle: {
                    color: Number(item[2]) < 85 ? '#00FF00' : // green for Reference Value < 85
                           Number(item[2]) > 120 ? '#FF0000' : // red for Reference Value > 120
                           '#3398DB' // default blue for others
                  }
                })),
                lineStyle: {
                  color: '#3398DB'
                },
                symbol: 'circle',
                symbolSize: 5,
                showAllSymbol: true, // 强制显示所有点
                symbolKeepAspect: true, // 保持圆形比例
                showSymbol: true,  
                label: {
                  show: false
                }
              }]
            }}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        <div className="text-xs text-gray-500 text-right mt-1">{metric.date}</div>
      </div>
    </div>
  )
}

// Helper function for chart data (moved from components/metric-card.tsx)
const generateChartData = (currentValue: number) => {
  const points = 50
  const data = []
  const volatility = currentValue * 0.2 // 20% volatility

  for (let i = 0; i < points; i++) {
    const value = currentValue + (Math.random() * 2 - 1) * volatility * (Math.sin(i / 3) + 1.5)
    // Generate indicator between 50-150 based on value variation
    const indicator = 100 + (value - currentValue) / currentValue * 100
    // Generate dates in YYYY-MM-DD format
    const date = new Date(2000, 5, 5 + i); // Starting from 2000-06-05
    const formattedDate = date.toISOString().split('T')[0];

    data.push([
      formattedDate,
      Math.max(0, value),
      Math.max(50, Math.min(150, indicator))
    ])
  }
  return data
}

// FaqSection Component (moved from components/faq-section.tsx)
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

// Main Page Component
const cryptoMetricsData = [
  {
    title: "BTC/USDT",
    value: "68,500.23",
    change: "+123.45",
    changePercent: "+0.18%",
    date: "Jul 15,2025",
    isPositive: true,
    isLongTermInvest: true,
    score: 30, // Double Buy
  },
  {
    title: "ETH/USDT",
    value: "3,890.75",
    change: "-15.20",
    changePercent: "-0.39%",
    date: "Jul 15,2025",
    isPositive: false,
    isLongTermInvest: true,
    score: 70, // Recommended Buy
  },
  {
    title: "BNB/USDT",
    value: "610.50",
    change: "+5.10",
    changePercent: "+0.84%",
    date: "Jul 15,2025",
    isPositive: true,
    isLongTermInvest: true,
    score: 95, // Pause
  },
  {
    title: "SOL/USDT",
    value: "155.80",
    change: "-2.30",
    changePercent: "-1.45%",
    date: "Jul 15,2025",
    isPositive: false,
    isLongTermInvest: true,
    score: 130, // Recommended Sell
  },
  {
    title: "XRP/USDT",
    value: "0.52",
    change: "+0.01",
    changePercent: "+1.96%",
    date: "Jul 15,2025",
    isPositive: true,
    score: 45, // Recommended Buy
  },
  {
    title: "ADA/USDT",
    value: "0.40",
    change: "-0.005",
    changePercent: "-1.23%",
    date: "Jul 15,2025",
    isPositive: false,
    score: 100, // Pause
  },
  {
    title: "DOGE/USDT",
    value: "0.12",
    change: "+0.002",
    changePercent: "+1.69%",
    date: "Jul 15,2025",
    isPositive: true,
    score: 25, // Double Buy
  },
  {
    title: "DOT/USDT",
    value: "7.80",
    change: "-0.15",
    changePercent: "-1.89%",
    date: "Jul 15,2025",
    isPositive: false,
    score: 110, // Pause
  },
  {
    title: "LTC/USDT",
    value: "75.20",
    change: "+0.80",
    changePercent: "+1.08%",
    date: "Jul 15,2025",
    isPositive: true,
    score: 80, // Recommended Buy
  },
  {
    title: "LINK/USDT",
    value: "14.30",
    change: "-0.25",
    changePercent: "-1.72%",
    date: "Jul 15,2025",
    isPositive: false,
    score: 140, // Recommended Sell
  },
  {
    title: "BCH/USDT",
    value: "420.00",
    change: "+5.50",
    changePercent: "+1.33%",
    date: "Jul 15,2025",
    isPositive: true,
    score: 35, // Double Buy
  },
  {
    title: "XLM/USDT",
    value: "0.10",
    change: "-0.001",
    changePercent: "-0.99%",
    date: "Jul 15,2025",
    isPositive: false,
    score: 90, // Pause
  },
]

export default function CryptoDashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center px-2 leading-6 py-0 my-[42px]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Digital Currency Dollar-Cost Averaging Dashboard:
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-orange-500">BTC, ETH, BNB,SOL,</span>
          <span className="text-gray-900"> and More</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Data-driven tools for digital currency investors, traders, and analysts—featuring real-time prices, historical
          charts, and DCA status.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="container mx-auto px-4 pb-12 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cryptoMetricsData.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <footer className="border-t bg-muted/50 flex flex-col justify-center items-center">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-base font-medium">Follow Us</h3>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Twitter className="h-6 w-6" />
                  <span className="text-xs">Twitter</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Facebook className="h-6 w-6" />
                  <span className="text-xs">Facebook</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Instagram className="h-6 w-6" />
                  <span className="text-xs">Instagram</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Send className="h-6 w-6" />
                  <span className="text-xs">Telegram</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-xs">Discord</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="font-bold">Smart Invest Digital</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Smart Invest Digital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
