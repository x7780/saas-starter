import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Cpu, Shield } from 'lucide-react';
import { TradingChart } from './trading-chart';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Smart Crypto DCA
                <span className="block bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">
                  Buy Low, Sleep Better
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Our algorithm automatically invests your $BTC, $ETH, $SOL at optimal prices 
                using proven dollar-cost averaging strategies. No emotions, just data.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button
                  size="lg"
                  className="text-lg rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg rounded-full ml-4 border-amber-400 text-amber-600 hover:bg-amber-50"
                >
                  How It Works
                </Button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <TradingChart />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Beat Market Prices
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Our algorithm identifies optimal entry points, historically 
                  achieving 12-15% better prices than regular DCA.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Automated Strategies
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Set your rules once and let our system execute trades 
                  automatically across multiple exchanges.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
                <Shield className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Non-Custodial
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Your keys, your coins. We never hold your funds - trades 
                  execute directly to your connected wallet or exchange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to DCA Like a Pro?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Join thousands of investors who are growing their crypto holdings 
                systematically with our proven strategies. No credit card required 
                to start your free trial.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Button
                size="lg"
                className="text-lg rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white"
              >
                Get Started in 30 Seconds
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
