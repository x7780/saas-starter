"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Download,
  Settings,
  Play,
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
  FileText,
  Terminal,
  Shield,
  TrendingUp,
  Clock,
  DollarSign,
  Key,
  ArrowUpRight,
} from "lucide-react"
import { useState } from "react"

export default function DocPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Strategy Introduction */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileText className="h-6 w-6 text-blue-500" />
              Strategy Introduction
            </CardTitle>
            <CardDescription className="text-base">
              Learn the core principles and advantages of the AI DCA strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Smart Decision</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Automatically determines buy, hold, and sell signals based on AI indicator and AI model
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">DCA Strategy</h3>
                </div>
                <p className="text-sm text-green-700">
                  Gradually accumulate assets through multiple purchases, reducing average cost and market volatility
                  impact
                </p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">Risk Control</h3>
                </div>
                <p className="text-sm text-purple-700">
                  Set profit targets and position limits to effectively control investment risk
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prerequisites */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Settings className="h-6 w-6 text-blue-500" />
              Prerequisites
            </CardTitle>
            <CardDescription className="text-base">
              Before starting, ensure you have the following environment and accounts ready
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Technical Environment
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Python 3.8+ environment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Freqtrade trading framework
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Stable internet connection
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Account Preparation
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Binance exchange account
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    BitDCA API key
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Sufficient USDT funds
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Installation Steps */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Download className="h-6 w-6 text-blue-500" />
              Installation Steps
            </CardTitle>
            <CardDescription className="text-base">
              Follow these steps to complete the installation of Freqtrade and the strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2">Install Freqtrade</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span># Install Freqtrade</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-green-400 hover:bg-slate-800"
                        onClick={() => copyToClipboard("pip install freqtrade", "install")}
                      >
                        {copiedCode === "install" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    pip install freqtrade
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2">Create Strategy Directory</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span># Create and enter strategy directory</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-green-400 hover:bg-slate-800"
                        onClick={() =>
                          copyToClipboard(
                            "mkdir freqtrade_strategy\ncd freqtrade_strategy\nfreqtrade create-userdir --userdir .",
                            "mkdir",
                          )
                        }
                      >
                        {copiedCode === "mkdir" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    mkdir freqtrade_strategy
                    <br />
                    cd freqtrade_strategy
                    <br />
                    freqtrade create-userdir --userdir .
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2">Download Strategy Files</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Click the download button to get the strategy files and extract them to the appropriate directories
                  </p>
                  <div className="flex gap-3">
                    <Button asChild className="bg-blue-500 hover:bg-blue-600">
                      <a href="https://download.bitdca.top/freqtrade/AI_strategy.zip" download>
                        <Download className="h-4 w-4 mr-2" />
                        Download Strategy Package
                      </a>
                    </Button>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>File Instructions:</strong>
                    </p>
                    <ul className="text-sm text-blue-600 mt-1 space-y-1">
                      <li>
                        • Place <code>AI_client.py</code> in the <code>strategies/</code> directory
                      </li>
                      <li>
                        • Place <code>config.json</code> in the root directory
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Settings className="h-6 w-6 text-blue-500" />
              Configuration
            </CardTitle>
            <CardDescription className="text-base">
              Modify the configuration files to suit your trading needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  1. Modify Strategy Parameters
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800 mb-3">
                    Modify the following key parameters in the strategy file:
                  </p>
                  <ul className="space-y-2 text-sm text-amber-700">
                    <li>
                      <code className="bg-amber-100 px-2 py-1 rounded">SERVER_URL</code> - Model server API address,
                      check the backend for the best performing model
                    </li>
                    <li>
                      <code className="bg-amber-100 px-2 py-1 rounded">API_KEY</code> - Replace with your BitDCA API key
                    </li>
                    <li>
                      <code className="bg-amber-100 px-2 py-1 rounded">PROFIT_TARGET</code> - Set profit target (e.g.,
                      1.3 means 30% profit)
                    </li>
                    <li>
                      <code className="bg-amber-100 px-2 py-1 rounded">POSITION_ADJUST_AMOUNT</code> - Amount for each
                      position adjustment (USDT)
                    </li>
                    <li>
                      <code className="bg-amber-100 px-2 py-1 rounded">MIN_ADJUST_INTERVAL_HOURS</code> - Minimum
                      interval between position adjustments (hours)
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  2. Key Parameters in config.json
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  In the downloaded configuration file, you need to modify these key parameters:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Exchange Configuration</h4>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li>
                        • <code className="bg-amber-100 px-2 py-1 rounded">exchange.key</code> - Enter your exchange API
                        Key
                      </li>
                      <li>
                        • <code className="bg-amber-100 px-2 py-1 rounded">exchange.secret</code> - Enter your exchange
                        Secret Key
                      </li>
                      <li>
                        • <code className="bg-amber-100 px-2 py-1 rounded">pair_whitelist</code> - Select trading pairs
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Trading Parameters</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>
                        • <code className="bg-blue-100 px-2 py-1 rounded">stake_amount</code> - Amount for each purchase
                        (USDT)
                      </li>
                      <li>
                        • <code className="bg-blue-100 px-2 py-1 rounded">dry_run</code> - Simulation switch
                        (true=simulation, false=real trading)
                      </li>
                      <li>
                        • <code className="bg-blue-100 px-2 py-1 rounded">dry_run_wallet</code> - Simulation wallet
                        amount
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Notification Settings (Optional)</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>
                        • <code className="bg-green-100 px-2 py-1 rounded">telegram.token</code> - Telegram bot Token
                      </li>
                      <li>
                        • <code className="bg-green-100 px-2 py-1 rounded">telegram.chat_id</code> - Your Telegram Chat
                        ID
                      </li>
                      <li>
                        • <code className="bg-green-100 px-2 py-1 rounded">telegram.enabled</code> - Enable Telegram
                        notifications
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameter Details */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Settings className="h-6 w-6 text-blue-500" />
              Recommended Parameters
            </CardTitle>
            <CardDescription className="text-base">
              Understand the meaning and recommended settings for each parameter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trading Parameters
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="text-sm font-mono text-blue-600">PROFIT_TARGET</code>
                      <Badge variant="secondary">Recommended: 1.2 - 1.35</Badge>
                    </div>
                    <p className="text-xs text-slate-600">Profit target multiplier, 1.3 means sell at 30% profit</p>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="text-sm font-mono text-blue-600">POSITION_ADJUST_AMOUNT</code>
                      <Badge variant="secondary">Recommended: 10 - 100</Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      Amount for each position adjustment (USDT), adjust based on your capital
                    </p>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="text-sm font-mono text-blue-600">MAX_PROFIT_FOR_ADJUST</code>
                      <Badge variant="secondary">Recommended: 0.05</Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      Stop adding positions when profit exceeds 5%, avoid chasing high prices
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Parameters
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="text-sm font-mono text-blue-600">MIN_ADJUST_INTERVAL_HOURS</code>
                      <Badge variant="secondary">Recommended: 24</Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      Minimum 24-hour interval between position adjustments, avoid frequent trading
                    </p>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="text-sm font-mono text-blue-600">timeframe</code>
                      <Badge variant="secondary">Fixed: 1d</Badge>
                    </div>
                    <p className="text-xs text-slate-600">Use daily data, suitable for long-term DCA strategy</p>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="text-sm font-mono text-blue-600">stoploss</code>
                      <Badge variant="secondary">Fixed: -1</Badge>
                    </div>
                    <p className="text-xs text-slate-600">No stop loss, suitable for long-term holding strategy</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exit Strategy */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ArrowUpRight className="h-6 w-6 text-blue-500" />
              Exit Strategy
            </CardTitle>
            <CardDescription className="text-base">
              Understanding how the strategy determines when to sell
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Profit Target Exit
                </h3>
                <p className="text-sm text-green-700 mb-3">
                  The strategy will automatically sell when the price reaches your configured profit target.
                </p>
                <div className="bg-white p-3 rounded-lg border border-green-100">
                  <p className="text-xs text-slate-600">
                    <code className="bg-green-100 px-1 py-0.5 rounded">PROFIT_TARGET = 1.3</code> means the position
                    will be sold when it reaches 30% profit.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  AI Model Exit Signal
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  The AI model continuously monitors market conditions and will issue an escape signal (E) when it
                  detects dangerous market conditions.
                </p>
                <div className="bg-white p-3 rounded-lg border border-amber-100">
                  <p className="text-xs text-slate-600">
                    When the model returns an <code className="bg-amber-100 px-1 py-0.5 rounded">E</code> signal, all
                    positions will be sold immediately, regardless of current profit or loss.
                  </p>
                </div>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <AlertTriangle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                <strong>Important:</strong> The dual exit strategy combines user-defined profit targets with AI-powered
                market analysis to optimize exit timing. This helps protect profits during market downturns while
                capturing upside potential.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Launch */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Play className="h-6 w-6 text-blue-500" />
              Launch
            </CardTitle>
            <CardDescription className="text-base">
              After configuration, start the strategy for automated trading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Simulation Trading (Recommended for Testing)
                </h3>
                <div className="bg-slate-900 text-green-400 p-3 rounded font-mono text-sm flex justify-between items-center">
                  <span>freqtrade trade --config config.json --strategy AIClient --dry-run</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-green-400 hover:bg-slate-800"
                    onClick={() =>
                      copyToClipboard(
                        "freqtrade trade --config config.json --strategy AIClient --dry-run",
                        "dry-run",
                      )
                    }
                  >
                    {copiedCode === "dry-run" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Real Trading (Use after confirmation)
                </h3>
                <div className="bg-slate-900 text-green-400 p-3 rounded font-mono text-sm flex justify-between items-center">
                  <span>freqtrade trade --config config.json --strategy AIClient</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-green-400 hover:bg-slate-800"
                    onClick={() =>
                      copyToClipboard("freqtrade trade --config config.json --strategy AIClient", "real-trade")
                    }
                  >
                    {copiedCode === "real-trade" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Risk Warning:</strong>
                Cryptocurrency trading involves high risk. Only invest funds you can afford to lose. We recommend
                running in simulation mode for at least one week to confirm the strategy performs as expected before
                using real funds.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <AlertTriangle className="h-6 w-6 text-blue-500" />
              FAQ
            </CardTitle>
            <CardDescription className="text-base">
              Solutions to common issues during installation and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Q: Where can I get the API key?</h3>
                <p className="text-sm text-slate-600">
                  A: Please visit{" "}
                  <a href="https://www.bitdca.top" className="text-blue-600 hover:underline">
                    www.bitdca.top
                  </a>{" "}
                  to register an account and obtain your API key.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Q: How often does the strategy execute?</h3>
                <p className="text-sm text-slate-600">
                  A: The strategy uses daily data and makes one decision per day. The exact execution time depends on
                  your Freqtrade configuration.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Q: How do I adjust the position amount?</h3>
                <p className="text-sm text-slate-600">
                  A: Modify the <code className="bg-slate-100 px-1 rounded">POSITION_ADJUST_AMOUNT</code> parameter in
                  the strategy file, and ensure the <code className="bg-slate-100 px-1 rounded">stake_amount</code> in
                  config.json is consistent.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Q: Does the strategy use stop-loss?</h3>
                <p className="text-sm text-slate-600">
                  A: This strategy does not set stop-loss as it uses a DCA approach. It only sells when reaching the
                  profit target or receiving an "escape" signal from the AI model.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
