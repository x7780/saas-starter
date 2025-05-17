"use client"

import { useState } from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, ResponsiveContainer } from "recharts"
import { ArrowUp, Wallet, Coins, DollarSign } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Helper function to generate price data for different coins
const generateCoinPriceData = (coinSymbol, startPrice) => {
  const data = []
  const startDate = new Date(2024, 4, 17) // May 17, 2024

  // Generate 365 days of data
  for (let i = 365; i >= 0; i--) {
    const date = new Date(startDate)
    date.setDate(date.getDate() - i)

    // Create some price volatility
    const volatility = Math.random() * 0.06 - 0.03 // -3% to +3%
    const prevPrice = i === 365 ? startPrice : data[365 - i - 1]?.close
    const open = prevPrice
    const close = Math.round(open * (1 + volatility))
    const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.02))
    const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.02))

    // Add purchase points every ~30 days
    const purchased =
      i % 30 === 0
        ? {
            quantity: coinSymbol === "DOG" ? Math.round((1000 / close) * 1000) : (1000 / close).toFixed(5),
            price: close,
          }
        : null

    data.push({
      date: date.toISOString().split("T")[0],
      open,
      close,
      high,
      low,
      purchased,
    })
  }

  return data
}

function BtcPriceChart() {
  const btcPriceData = generateCoinPriceData("BTC", 35000)

  const [tooltipData, setTooltipData] = useState(null)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium mb-1">{data.date}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Open:</span>
            <span>{formatPrice(data.open)}</span>
            <span className="text-muted-foreground">Close:</span>
            <span>{formatPrice(data.close)}</span>
            {data.purchased && (
              <>
                <span className="text-muted-foreground">Purchased:</span>
                <span>{data.purchased.quantity} BTC</span>
                <span className="text-muted-foreground">Purchase Price:</span>
                <span>{formatPrice(data.purchased.price)}</span>
                <span className="text-muted-foreground">Purchase Cost:</span>
                <span>{formatPrice(data.purchased.price * Number.parseFloat(data.purchased.quantity))}</span>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={btcPriceData}
        margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
        onMouseMove={(data) => {
          if (data && data.activePayload) {
            setTooltipData(data.activePayload[0].payload)
          }
        }}
      >
        <defs>
          <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          tick={{ fontSize: 12 }}
          tickCount={6}
        />
        <YAxis
          domain={["dataMin - 1000", "dataMax + 1000"]}
          tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          tick={{ fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#btcGradient)"
          dot={(props) => {
            const { cx, cy, payload } = props
            // Only show dots for purchase points
            if (payload.purchased) {
              return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />
            }
            return null
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function EthPriceChart() {
  // Similar implementation as BtcPriceChart but for ETH
  const ethPriceData = generateCoinPriceData("ETH", 2000)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium mb-1">{data.date}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Open:</span>
            <span>{formatPrice(data.open)}</span>
            <span className="text-muted-foreground">Close:</span>
            <span>{formatPrice(data.close)}</span>
            {data.purchased && (
              <>
                <span className="text-muted-foreground">Purchased:</span>
                <span>{data.purchased.quantity} ETH</span>
                <span className="text-muted-foreground">Purchase Price:</span>
                <span>{formatPrice(data.purchased.price)}</span>
                <span className="text-muted-foreground">Purchase Cost:</span>
                <span>{formatPrice(data.purchased.price * Number.parseFloat(data.purchased.quantity))}</span>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={ethPriceData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="ethGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          tick={{ fontSize: 12 }}
          tickCount={6}
        />
        <YAxis
          domain={["dataMin - 100", "dataMax + 100"]}
          tickFormatter={(value) => `$${Math.round(value)}`}
          tick={{ fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#6b7280"
          fillOpacity={1}
          fill="url(#ethGradient)"
          dot={(props) => {
            const { cx, cy, payload } = props
            if (payload.purchased) {
              return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />
            }
            return null
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function BnbPriceChart() {
  // Similar implementation as BtcPriceChart but for ETH
  const ethPriceData = generateCoinPriceData("BNB", 300)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium mb-1">{data.date}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Open:</span>
            <span>{formatPrice(data.open)}</span>
            <span className="text-muted-foreground">Close:</span>
            <span>{formatPrice(data.close)}</span>
            {data.purchased && (
              <>
                <span className="text-muted-foreground">Purchased:</span>
                <span>{data.purchased.quantity} BNB</span>
                <span className="text-muted-foreground">Purchase Price:</span>
                <span>{formatPrice(data.purchased.price)}</span>
                <span className="text-muted-foreground">Purchase Cost:</span>
                <span>{formatPrice(data.purchased.price * Number.parseFloat(data.purchased.quantity))}</span>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={ethPriceData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="bnbGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F0B90B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F0B90B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          tick={{ fontSize: 12 }}
          tickCount={6}
        />
        <YAxis
          domain={["dataMin - 10", "dataMax + 10"]}
          tickFormatter={(value) => `$${Math.round(value)}`}
          tick={{ fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#F0B90B"
          fillOpacity={1}
          fill="url(#bnbGradient)"
          dot={(props) => {
            const { cx, cy, payload } = props
            if (payload.purchased) {
              return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />
            }
            return null
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function SolPriceChart() {
  // Similar implementation as BtcPriceChart but for ETH
  const ethPriceData = generateCoinPriceData("SOL", 50)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium mb-1">{data.date}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Open:</span>
            <span>{formatPrice(data.open)}</span>
            <span className="text-muted-foreground">Close:</span>
            <span>{formatPrice(data.close)}</span>
            {data.purchased && (
              <>
                <span className="text-muted-foreground">Purchased:</span>
                <span>{data.purchased.quantity} SOL</span>
                <span className="text-muted-foreground">Purchase Price:</span>
                <span>{formatPrice(data.purchased.price)}</span>
                <span className="text-muted-foreground">Purchase Cost:</span>
                <span>{formatPrice(data.purchased.price * Number.parseFloat(data.purchased.quantity))}</span>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={ethPriceData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="solGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#000000" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          tick={{ fontSize: 12 }}
          tickCount={6}
        />
        <YAxis
          domain={["dataMin - 5", "dataMax + 5"]}
          tickFormatter={(value) => `$${Math.round(value)}`}
          tick={{ fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#000000"
          fillOpacity={1}
          fill="url(#solGradient)"
          dot={(props) => {
            const { cx, cy, payload } = props
            if (payload.purchased) {
              return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />
            }
            return null
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function DogPriceChart() {
  // Similar implementation as BtcPriceChart but for ETH
  const ethPriceData = generateCoinPriceData("DOG", 0.07)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium mb-1">{data.date}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Open:</span>
            <span>{formatPrice(data.open)}</span>
            <span className="text-muted-foreground">Close:</span>
            <span>{formatPrice(data.close)}</span>
            {data.purchased && (
              <>
                <span className="text-muted-foreground">Purchased:</span>
                <span>{data.purchased.quantity} DOG</span>
                <span className="text-muted-foreground">Purchase Price:</span>
                <span>{formatPrice(data.purchased.price)}</span>
                <span className="text-muted-foreground">Purchase Cost:</span>
                <span>{formatPrice(data.purchased.price * Number.parseFloat(data.purchased.quantity))}</span>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={ethPriceData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="dogGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C2A634" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#C2A634" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          tick={{ fontSize: 12 }}
          tickCount={6}
        />
        <YAxis
          domain={["dataMin - 0.001", "dataMax + 0.001"]}
          tickFormatter={(value) => `$${value.toFixed(3)}`}
          tick={{ fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#C2A634"
          fillOpacity={1}
          fill="url(#dogGradient)"
          dot={(props) => {
            const { cx, cy, payload } = props
            if (payload.purchased) {
              return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />
            }
            return null
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Digital market investment overview</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,430</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,800</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                +8.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Count</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                +12
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,630</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                +18.4%
              </span>{" "}
              from initial investment
            </p>
          </CardContent>
        </Card>
      </div>


      {/* Coin Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Coin Statistics</CardTitle>
          <CardDescription>Your current holdings and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Holdings</TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Bitcoin",
                  symbol: "BTC",
                  holdings: "0.85",
                  purchasePrice: "$32,450",
                  currentPrice: "$38,750",
                  profitLoss: "+19.4%",
                  isProfit: true,
                },
                {
                  name: "Ethereum",
                  symbol: "ETH",
                  holdings: "5.2",
                  purchasePrice: "$1,850",
                  currentPrice: "$2,240",
                  profitLoss: "+21.1%",
                  isProfit: true,
                },
                {
                  name: "Binance Coin",
                  symbol: "BNB",
                  holdings: "12.5",
                  purchasePrice: "$320",
                  currentPrice: "$295",
                  profitLoss: "-7.8%",
                  isProfit: false,
                },
                {
                  name: "Solana",
                  symbol: "SOL",
                  holdings: "45",
                  purchasePrice: "$85",
                  currentPrice: "$110",
                  profitLoss: "+29.4%",
                  isProfit: true,
                },
                {
                  name: "Dogecoin",
                  symbol: "DOG",
                  holdings: "12,500",
                  purchasePrice: "$0.08",
                  currentPrice: "$0.075",
                  profitLoss: "-6.3%",
                  isProfit: false,
                },
              ].map((coin, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={coin.name} />
                        <AvatarFallback>{coin.symbol.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{coin.name}</p>
                        <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{coin.holdings}</TableCell>
                  <TableCell>{coin.purchasePrice}</TableCell>
                  <TableCell>{coin.currentPrice}</TableCell>
                  <TableCell>
                    <span className={coin.isProfit ? "text-green-500" : "text-red-500"}>{coin.profitLoss}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
