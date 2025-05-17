'use client';

import { ArrowUp, CreditCard, LineChart, Bitcoin, Wallet, Coins } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">View your digital market investment overview and performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
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

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Investment Summary</CardTitle>
              <CardDescription>Total amount and frequency</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Total Amount</span>
                <span className="text-2xl font-bold">$45,800</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Investment Count</span>
                <span className="text-2xl font-bold">124</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>{/* Investment summary content here */}</CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
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
                  <TableHead>Actions</TableHead>
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
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>BTC Price History</CardTitle>
              <CardDescription>Historical prices and your investment dates</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Last 6 months
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Time Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                <DropdownMenuItem>Last 6 months</DropdownMenuItem>
                <DropdownMenuItem>Last year</DropdownMenuItem>
                <DropdownMenuItem>All time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <LineChart className="h-16 w-16 mb-4" />
                <p>BTC Price Chart</p>
                <p className="text-sm">Price trend with your investment points marked</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Investments</CardTitle>
            <CardDescription>Your recent DCA transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Buy", coin: "Bitcoin", amount: "0.015 BTC", value: "$580", date: "2025-05-15" },
                { type: "Buy", coin: "Ethereum", amount: "0.25 ETH", value: "$560", date: "2025-05-08" },
                { type: "Buy", coin: "Solana", amount: "5 SOL", value: "$550", date: "2025-05-01" },
                { type: "Buy", coin: "Bitcoin", amount: "0.012 BTC", value: "$464", date: "2025-04-24" },
                { type: "Buy", coin: "Ethereum", amount: "0.2 ETH", value: "$448", date: "2025-04-17" },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={transaction.coin} />
                      <AvatarFallback>{transaction.coin.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="font-medium">{transaction.coin}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.type}</span>
                        <span>•</span>
                        <span>{transaction.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-1 text-right">
                    <p className="font-medium">{transaction.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Plans</CardTitle>
            <CardDescription>Your active DCA strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Bitcoin DCA", amount: "$100", frequency: "Weekly", status: "Active", date: "Every Monday" },
                { name: "Ethereum DCA", amount: "$80", frequency: "Weekly", status: "Active", date: "Every Monday" },
                { name: "BNB DCA", amount: "$50", frequency: "Monthly", status: "Active", date: "1st of month" },
                { name: "Solana DCA", amount: "$30", frequency: "Monthly", status: "Active", date: "1st of month" },
                { name: "Dogecoin DCA", amount: "$20", frequency: "Monthly", status: "Active", date: "15th of month" },
              ].map((plan, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="grid gap-1">
                    <p className="font-medium">{plan.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{plan.amount}</span>
                      <span>•</span>
                      <span>{plan.frequency}</span>
                      <span>•</span>
                      <span>{plan.date}</span>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create New DCA Plan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Current market conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Bitcoin className="mr-2 h-4 w-4" />
                      Bitcoin
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-xl font-bold">$38,750</div>
                    <p className="text-xs text-green-500">+2.4% (24h)</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      Ethereum
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-xl font-bold">$2,240</div>
                    <p className="text-xs text-green-500">+1.8% (24h)</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Coins className="mr-2 h-4 w-4" />
                      BNB
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-xl font-bold">$295</div>
                    <p className="text-xs text-red-500">-0.7% (24h)</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Coins className="mr-2 h-4 w-4" />
                      Solana
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-xl font-bold">$110</div>
                    <p className="text-xs text-green-500">+3.2% (24h)</p>
                  </CardContent>
                </Card>
              </div>
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Market Sentiment</h3>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md p-3">
                  <span>Fear & Greed Index</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">65 - Greed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Market Analysis
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
