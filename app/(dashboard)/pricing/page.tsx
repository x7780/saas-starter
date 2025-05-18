import { checkoutAction } from "@/lib/payments/actions"
import { Check, X } from "lucide-react"
import { getStripePrices, getStripeProducts } from "@/lib/payments/stripe"
import { SubmitButton } from "./submit-button"

// Prices are fresh for one hour max
export const revalidate = 3600

export default async function PricingPage() {
  const [prices, products] = await Promise.all([getStripePrices(), getStripeProducts()])

  const basePlan = products.find((product) => product.name === "Base")
  const plusPlan = products.find((product) => product.name === "Plus")

  const basePrice = prices.find((price) => price.productId === basePlan?.id)
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id)

  // Define features for each plan
  const features = [
    { name: "BTC DCA", free: true, base: true, plus: true },
    { name: "ETH DCA", free: false, base: true, plus: true },
    { name: "SOL DCA", free: false, base: true, plus: true },
    { name: "BNB DCA", free: false, base: true, plus: true },
    { name: "DOGE DCA", free: false, base: true, plus: true },
    { name: "Telegram Notifications", free: true, base: true, plus: true },
    { name: "Discord Notifications", free: false, base: true, plus: true },
    { name: "AI Analysis", free: false, base: false, plus: true },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose the Right Plan for Your Investment Journey
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Select a plan that fits your investment strategy. All plans include our core DCA functionality.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <PricingCard
          name="Free"
          price={0}
          interval="forever"
          trialDays={0}
          features={features}
          tier="free"
          description="Get started with basic DCA investing"
          buttonText="Get Started"
          popular={false}
        />

        {/* Plus Plan */}
        <PricingCard
          name={plusPlan?.name || "Plus"}
          price={plusPrice?.unitAmount || 1200}
          interval="year"
          trialDays={plusPrice?.trialPeriodDays || 7}
          features={features}
          tier="plus"
          description="Advanced features for serious investors"
          priceId={plusPrice?.id}
          popular={true}
          duration="1 year"
        />

        {/* Base Plan */}
        <PricingCard
          name={basePlan?.name || "Base"}
          price={basePrice?.unitAmount || 800}
          interval="quarter"
          trialDays={basePrice?.trialPeriodDays || 7}
          features={features}
          tier="base"
          description="Perfect for active crypto investors"
          priceId={basePrice?.id}
          popular={false}
          duration="3 months"
        />
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Need a custom solution?</h2>
        <p className="mt-2 text-gray-600">Contact us for enterprise pricing or custom requirements.</p>
        <button className="mt-4 text-primary hover:underline font-medium">Contact Sales</button>
      </div>
    </main>
  )
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  tier,
  description,
  priceId,
  buttonText = "Get Started",
  popular = false,
  duration,
}: {
  name: string
  price: number
  interval: string
  trialDays: number
  features: { name: string; free: boolean; base: boolean; plus: boolean }[]
  tier: "free" | "base" | "plus"
  description: string
  priceId?: string
  buttonText?: string
  popular?: boolean
  duration?: string
}) {
  const displayInterval = interval === "quarter" ? "3 months" : interval

  return (
    <div
      className={`rounded-2xl border ${popular ? "border-primary shadow-lg ring-1 ring-primary" : "border-gray-200"} overflow-hidden`}
    >
      {popular && <div className="bg-primary py-1 text-center text-sm font-medium text-white">Most Popular</div>}

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>

        <div className="mt-4 flex items-baseline">
          {price === 0 ? (
            <span className="text-4xl font-bold tracking-tight text-gray-900">Free</span>
          ) : (
            <>
              <span className="text-4xl font-bold tracking-tight text-gray-900">${price / 100}</span>
              <span className="ml-1 text-xl font-medium text-gray-500">/{displayInterval}</span>
            </>
          )}
        </div>

        {duration && <p className="mt-1 text-sm text-gray-500">{duration} subscription</p>}

        {trialDays > 0 && <p className="mt-1 text-sm text-gray-500">with {trialDays} day free trial</p>}

        <ul className="mt-6 space-y-4">
          {features.map((feature) => {
            const included = tier === "free" ? feature.free : tier === "base" ? feature.base : feature.plus

            return (
              <li key={feature.name} className="flex items-start">
                {included ? (
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <span className={`text-sm ${included ? "text-gray-700" : "text-gray-400"}`}>{feature.name}</span>
              </li>
            )
          })}
        </ul>

        {tier === "free" ? (
          <button className="mt-8 w-full rounded-md bg-gray-100 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            {buttonText}
          </button>
        ) : (
          <form action={checkoutAction} className="mt-8">
            <input type="hidden" name="priceId" value={priceId} />
            <SubmitButton />
          </form>
        )}
      </div>
    </div>
  )
}
