"use client"

import { useState } from "react"
import { ArrowUpDown, Brain, ChevronLeft, ChevronRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const cryptoData = {
  btc: {
    name: "Bitcoin",
    symbol: "BTC",
    color: "#F7931A",
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
    let price = 0
    let amount = 0

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

    // Format date as YYYY-MM-DD using native JavaScript
    const formattedDate = date.toISOString().split("T")[0]

    transactions.push({
      id: i + 1,
      date: formattedDate,
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

export default function AutoInvestPage() {
  const [currentPage, setCurrentPage] = useState(1)
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
          <Button disabled variant="default" size="sm">
            <Brain className="mr-2 h-4 w-4" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Holdings Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Holdings Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(cryptoData).map(([key, crypto]) => (
            <Card key={key}>
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
    </div>
  )
}
