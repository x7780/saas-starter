"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Bitcoin, ChevronDown, DollarSign, LineChartIcon, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("1M")

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between space-y-2 pb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {timeRange} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange("1W")}>1 Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("1M")}>1 Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("3M")}>3 Months</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("1Y")}>1 Year</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("ALL")}>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>New Investment</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,546.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,879.32</div>
            <div className="flex items-center text-xs text-emerald-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              +26.5% all time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
            <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">BTC, ETH, SOL</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Investment</CardTitle>
            <Bitcoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2d 14h</div>
            <p className="text-xs text-muted-foreground">$250 in BTC</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your investment growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current distribution of your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <AllocationChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Cryptocurrency Performance</CardTitle>
            <CardDescription>Track the performance of your crypto investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="btc" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="btc">Bitcoin (BTC)</TabsTrigger>
                <TabsTrigger value="eth">Ethereum (ETH)</TabsTrigger>
                <TabsTrigger value="sol">Solana (SOL)</TabsTrigger>
              </TabsList>
              <TabsContent value="btc" className="space-y-4">
                <CryptoStats
                  symbol="BTC"
                  price="$65,432.18"
                  change="+2.4%"
                  invested="$5,250.00"
                  value="$7,128.45"
                  profit="+35.8%"
                  isPositive={true}
                />
                <CryptoChart color="#ff9900" />
              </TabsContent>
              <TabsContent value="eth" className="space-y-4">
                <CryptoStats
                  symbol="ETH"
                  price="$3,487.92"
                  change="-1.2%"
                  invested="$4,800.00"
                  value="$5,231.88"
                  profit="+9.0%"
                  isPositive={true}
                />
                <CryptoChart color="#627eea" />
              </TabsContent>
              <TabsContent value="sol" className="space-y-4">
                <CryptoStats
                  symbol="SOL"
                  price="$142.76"
                  change="+5.7%"
                  invested="$2,496.00"
                  value="$3,519.00"
                  profit="+40.9%"
                  isPositive={true}
                />
                <CryptoChart color="#14f195" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest investment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TransactionItem
                date="May 15, 2025"
                type="Buy"
                asset="Bitcoin (BTC)"
                amount="0.00384 BTC"
                value="$250.00"
              />
              <TransactionItem
                date="May 8, 2025"
                type="Buy"
                asset="Ethereum (ETH)"
                amount="0.0721 ETH"
                value="$250.00"
              />
              <TransactionItem date="May 1, 2025" type="Buy" asset="Solana (SOL)" amount="1.752 SOL" value="$250.00" />
              <TransactionItem
                date="Apr 24, 2025"
                type="Buy"
                asset="Bitcoin (BTC)"
                amount="0.00391 BTC"
                value="$250.00"
              />
              <TransactionItem
                date="Apr 17, 2025"
                type="Buy"
                asset="Ethereum (ETH)"
                amount="0.0734 ETH"
                value="$250.00"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CryptoStats({
  symbol,
  price,
  change,
  invested,
  value,
  profit,
  isPositive,
}: {
  symbol: string
  price: string
  change: string
  invested: string
  value: string
  profit: string
  isPositive: boolean
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{price}</div>
          <div className={`flex items-center text-xs ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            {change} (24h)
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{invested}</div>
          <p className="text-xs text-muted-foreground">In {symbol}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">In {symbol}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>{profit}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionItem({
  date,
  type,
  asset,
  amount,
  value,
}: {
  date: string
  type: string
  asset: string
  amount: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="grid gap-1">
        <p className="text-sm font-medium">
          {type} {asset}
        </p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <div className="grid gap-1 text-right">
        <p className="text-sm font-medium">{amount}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function PortfolioChart() {
  const data = [
    { date: "Jan", value: 10000 },
    { date: "Feb", value: 10200 },
    { date: "Mar", value: 10800 },
    { date: "Apr", value: 11500 },
    { date: "May", value: 12546 },
    { date: "Jun", value: 13200 },
    { date: "Jul", value: 14100 },
    { date: "Aug", value: 14800 },
    { date: "Sep", value: 15200 },
    { date: "Oct", value: 15879 },
  ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function AllocationChart() {
  const data = [
    { name: "BTC", value: 45, fill: "#ff9900" },
    { name: "ETH", value: 33, fill: "#627eea" },
    { name: "SOL", value: 22, fill: "#14f195" },
  ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
          <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
          <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function CryptoChart({ color }: { color: string }) {
  // Generate random data for the chart
  const generateData = () => {
    const data = []
    let value = 10000 + Math.random() * 2000

    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (30 - i))

      value = value + (Math.random() - 0.45) * 500

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: value,
      })
    }

    return data
  }

  const data = generateData()

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Line type="monotone" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
