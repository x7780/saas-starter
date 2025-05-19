"use client"

import { useState } from "react"
import { ArrowUpDown, Brain, ChevronLeft, ChevronRight, Download } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

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

// Simple button component using Radix UI Slot
function Button({ className, variant = "default", size = "default", children, ...props }) {
  return (
    <Slot
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "text-primary underline-offset-4 hover:underline": variant === "link",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {children}
    </Slot>
  )
}

export default function AutoInvestPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState("all")
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

  // Filter transactions based on selected coin
  const filteredTransactions =
    selectedCoin === "all" ? transactions : transactions.filter((tx) => tx.pair.startsWith(selectedCoin.toUpperCase()))

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const currentTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Auto-Invest (Daily)</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-9 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 h-9 text-sm font-medium opacity-50 cursor-not-allowed"
            disabled
          >
            <Brain className="mr-2 h-4 w-4" />
            AI Insights
          </button>
        </div>
      </div>

      {/* Holdings Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Holdings Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(cryptoData).map(([key, crypto]) => (
            <div key={key} className="bg-card text-card-foreground rounded-xl border shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold">{crypto.symbol}</h3>
              </div>
              <div className="p-6 pt-2">
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
              </div>
            </div>
          ))}
        </div>

        {/* Total Statistics */}
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm mt-4">
          <div className="p-6 pb-2">
            <h3 className="font-semibold">Total Statistics</h3>
          </div>
          <div className="p-6">
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
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm">
          <div className="p-6 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Transaction Records</h3>
              <div className="flex items-center gap-2">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="inline-flex items-center justify-between rounded-md border border-input bg-background px-3 h-9 w-[150px] text-sm">
                      {selectedCoin === "all" ? "All Coins" : selectedCoin.toUpperCase()}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                      <DropdownMenu.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSelectedCoin("all")
                          setCurrentPage(1)
                        }}
                      >
                        All Coins
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSelectedCoin("btc")
                          setCurrentPage(1)
                        }}
                      >
                        BTC
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSelectedCoin("eth")
                          setCurrentPage(1)
                        }}
                      >
                        ETH
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSelectedCoin("sol")
                          setCurrentPage(1)
                        }}
                      >
                        SOL
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSelectedCoin("bnb")
                          setCurrentPage(1)
                        }}
                      >
                        BNB
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSelectedCoin("doge")
                          setCurrentPage(1)
                        }}
                      >
                        DOGE
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <button className="inline-flex items-center justify-center font-medium p-0 h-8">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <button className="inline-flex items-center justify-center font-medium p-0 h-8">
                        Trading Pair
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Price</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Fee</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {currentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{tx.date}</td>
                      <td className="p-4 align-middle">{tx.pair}</td>
                      <td className="p-4 align-middle text-right">{tx.amount}</td>
                      <td className="p-4 align-middle text-right">{tx.price}</td>
                      <td className="p-4 align-middle text-right">{tx.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <button
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-9 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <button
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-9 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Missing ChevronDown icon
function ChevronDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
