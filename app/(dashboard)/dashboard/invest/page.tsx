"use client"

import { useState } from "react"
import { format } from "date-fns"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpDown, Brain, Calendar, ChevronLeft, ChevronRight, Download, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const generateChartData = (days = 365, volatility = 0.05, startPrice = 1000, trend = 0.0002) => {
  const data = []
  let price = startPrice

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Add some randomness and trend
    const change = price * (Math.random() * volatility * 2 - volatility + trend)
    price += change

    data.push({
      date: format(date, "MMM dd"),
      price: Math.max(price, 0).toFixed(2),
    })
  }

  return data
}

const cryptoData = {
  btc: {
    name: "Bitcoin",
    symbol: "BTC",
    color: "#F7931A",
    data: generateChartData(365, 0.03, 30000, 0.0004),
    holdings: {
      amount: "0.45",
      cost: "$13,500.00",
      fees: "$67.50",
      transactions: 90,
    },
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    color: "#627EEA",
    data: generateChartData(365, 0.04, 2000, 0.0003),
    holdings: {
      amount: "5.2",
      cost: "$10,400.00",
      fees: "$52.00",
      transactions: 104,
    },
  },
  sol: {
    name: "Solana",
    symbol: "SOL",
    color: "#00FFA3",
    data: generateChartData(365, 0.06, 100, 0.0005),
    holdings: {
      amount: "75.8",
      cost: "$7,580.00",
      fees: "$37.90",
      transactions: 76,
    },
  },
  bnb: {
    name: "Binance Coin",
    symbol: "BNB",
    color: "#F3BA2F",
    data: generateChartData(365, 0.035, 300, 0.0002),
    holdings: {
      amount: "12.5",
      cost: "$3,750.00",
      fees: "$18.75",
      transactions: 50,
    },
  },
  doge: {
    name: "Dogecoin",
    symbol: "DOGE",
    color: "#C2A633",
    data: generateChartData(365, 0.07, 0.1, 0.0001),
    holdings: {
      amount: "15,000",
      cost: "$1,500.00",
      fees: "$7.50",
      transactions: 30,
    },
  },
}

// Mock transaction history
const generateTransactions = (count = 100) => {
  const transactions = []
  const cryptos = ["BTC", "ETH", "SOL", "BNB", "DOGE"]

  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 365))

    const crypto = cryptos[Math.floor(Math.random() * cryptos.length)]
    let price, amount

    switch (crypto) {
      case "BTC":
        price = 20000 + Math.random() * 20000
        amount = 0.001 + Math.random() * 0.01
        break
      case "ETH":
        price = 1000 + Math.random() * 2000
        amount = 0.01 + Math.random() * 0.1
        break
      case "SOL":
        price = 50 + Math.random() * 100
        amount = 0.1 + Math.random() * 1
        break
      case "BNB":
        price = 200 + Math.random() * 200
        amount = 0.05 + Math.random() * 0.5
        break
      case "DOGE":
        price = 0.05 + Math.random() * 0.2
        amount = 100 + Math.random() * 1000
        break
      default:
        price = 100
        amount = 1
    }

    const total = price * amount
    const fee = total * 0.005

    transactions.push({
      id: i + 1,
      date: format(date, "yyyy-MM-dd"),
      pair: `${crypto}/USD`,
      amount: amount.toFixed(crypto === "DOGE" ? 0 : 4),
      price: `$${price.toFixed(2)}`,
      fee: `$${fee.toFixed(2)}`,
    })
  }

  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const transactions = generateTransactions(100)

// AI insights mock data
const aiInsights = [
  {
    title: "Market Trend Analysis",
    description:
      "Based on the last 30 days of market data, our AI predicts a potential uptrend for BTC and ETH in the next 7 days. Consider increasing your daily investment amount by 10%.",
    confidence: 78,
  },
  {
    title: "Portfolio Optimization",
    description:
      "Your current allocation is heavily weighted towards BTC (45%). For better risk-adjusted returns, consider increasing your SOL allocation from 15% to 20%.",
    confidence: 82,
  },
  {
    title: "Fee Optimization",
    description:
      "By consolidating your daily purchases into bi-weekly investments, you could reduce your annual fees by approximately 22% while maintaining similar dollar-cost averaging benefits.",
    confidence: 91,
  },
]

export default function AutoInvestPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCrypto, setSelectedCrypto] = useState("btc")
  const [aiDialogOpen, setAiDialogOpen] = useState(false)
  const itemsPerPage = 10

  // Calculate total statistics
  const totalStats = {
    cost: Object.values(cryptoData).reduce(
      (sum, crypto) => sum + Number.parseFloat(crypto.holdings.cost.replace("$", "").replace(",", "")),
      0,
    ),
    fees: Object.values(cryptoData).reduce(
      (sum, crypto) => sum + Number.parseFloat(crypto.holdings.fees.replace("$", "").replace(",", "")),
      0,
    ),
    transactions: Object.values(cryptoData).reduce((sum, crypto) => sum + crypto.holdings.transactions, 0),
  }

  // Pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const currentTransactions = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Auto-Invest (Daily)</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={() => setAiDialogOpen(true)} variant="default" size="sm">
            <Brain className="mr-2 h-4 w-4" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Crypto Charts */}
      <Tabs defaultValue="btc" onValueChange={setSelectedCrypto}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="btc">BTC</TabsTrigger>
          <TabsTrigger value="eth">ETH</TabsTrigger>
          <TabsTrigger value="sol">SOL</TabsTrigger>
          <TabsTrigger value="bnb">BNB</TabsTrigger>
          <TabsTrigger value="doge">DOGE</TabsTrigger>
        </TabsList>

        {Object.entries(cryptoData).map(([key, crypto]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      {crypto.name} ({crypto.symbol})
                    </CardTitle>
                    <CardDescription>365-day price chart</CardDescription>
                  </div>
                  <Select defaultValue="365d">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30d">30 Days</SelectItem>
                      <SelectItem value="90d">90 Days</SelectItem>
                      <SelectItem value="180d">180 Days</SelectItem>
                      <SelectItem value="365d">365 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={crypto.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          // Show fewer ticks for readability
                          const index = crypto.data.findIndex((item) => item.date === value)
                          return index % 30 === 0 ? value : ""
                        }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        domain={["auto", "auto"]}
                        tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, "Price"]}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={crypto.color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Holdings Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Holdings Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(cryptoData).map(([key, crypto]) => (
            <Card key={key} className={selectedCrypto === key ? "ring-2 ring-primary" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{crypto.symbol}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">{crypto.holdings.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="font-medium">{crypto.holdings.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fees:</span>
                    <span className="font-medium">{crypto.holdings.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transactions:</span>
                    <span className="font-medium">{crypto.holdings.transactions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total Statistics */}
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle>Total Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground mb-1">Total Cost</span>
                <span className="text-2xl font-bold">${totalStats.cost.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground mb-1">Total Fees</span>
                <span className="text-2xl font-bold">${totalStats.fees.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground mb-1">Total Transactions</span>
                <span className="text-2xl font-bold">{totalStats.transactions}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Transaction Records</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Filter by Date
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by Coin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Coins</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="bnb">BNB</SelectItem>
                    <SelectItem value="doge">DOGE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Trading Pair
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.date}</TableCell>
                    <TableCell>{tx.pair}</TableCell>
                    <TableCell className="text-right">{tx.amount}</TableCell>
                    <TableCell className="text-right">{tx.price}</TableCell>
                    <TableCell className="text-right">{tx.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Dialog */}
      <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI Investment Insights
            </DialogTitle>
            <DialogDescription>
              Our AI analyzes your investment patterns and market trends to provide personalized recommendations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {aiInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{insight.description}</p>
                </CardContent>
                <CardFooter className="pt-0 text-sm text-muted-foreground">
                  Confidence: {insight.confidence}%
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Customize AI Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                <Select defaultValue="moderate">
                  <SelectTrigger id="risk-tolerance">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment-horizon">Investment Horizon</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="investment-horizon">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-term ({`< 1 year`})</SelectItem>
                    <SelectItem value="medium">Medium-term (1-3 years)</SelectItem>
                    <SelectItem value="long">Long-term (3+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAiDialogOpen(false)}>
              Close
            </Button>
            <Button>Apply Recommendations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
