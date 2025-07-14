"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, DollarSign, Bitcoin, Wallet } from "lucide-react"

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Free Trial",
      price: "Free",
      duration: "7 Days",
      features: ["1 Host Supported", "1 IP Binding", "Basic Data Adjustment", "Limited Support"],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
      isPopular: false,
      disabled: true,
    },
    {
      name: "Half-Year Plan",
      price: "$29",
      duration: "6 Months",
      features: ["1 Host Supported", "1 IP Binding", "Advanced Data Adjustment", "Priority Support"],
      buttonText: "Get Half-Year Plan",
      buttonVariant: "default",
      isPopular: false,
    },
    {
      name: "Annual Plan",
      price: "$49",
      duration: "1 Year",
      features: ["1 Host Supported", "1 IP Binding", "Comprehensive Data Adjustment", "24/7 Premium Support"],
      buttonText: "Get Annual Plan",
      buttonVariant: "default",
      isPopular: true,
    },
  ]

  const paymentMethods = [
    { name: "Bitcoin", icon: Bitcoin },
    { name: "Ethereum", icon: Wallet }, // Using Wallet for ETH as there's no specific ETH icon in Lucide
    { name: "Solana", icon: Wallet }, // Using Wallet for SOL
    { name: "USD", icon: DollarSign },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Flexible Pricing for Your Needs</h1>
          <p className="text-slate-600">
            Choose the plan that best fits your usage and enjoy seamless service.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`border-0 shadow-xl flex flex-col ${
                tier.isPopular ? "border-blue-500 ring-2 ring-blue-500" : ""
              }`}
            >
              <CardHeader className="text-center pb-4">
                {tier.isPopular && (
                  <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full mx-auto mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-3xl font-bold text-slate-800">{tier.name}</CardTitle>
                <CardDescription className="text-slate-600 mt-2">
                  <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  {tier.price !== "Free" && <span className="text-xl font-medium">/ {tier.duration}</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 px-6 py-4">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-base">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className={`w-full text-lg py-3 ${
                    tier.buttonVariant === "default"
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border-slate-300 hover:bg-slate-50 bg-transparent text-slate-800"
                  }`}
                  variant={tier.buttonVariant as "default" | "outline"}
                  disabled={tier.disabled}
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Customer Service */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Need a custom solution?</h2>
          <p className="mt-2 text-gray-600">Contact us for enterprise pricing or custom requirements.</p>
          <button className="mt-4 text-primary hover:underline font-medium">Contact Sales</button>
        </div>
      </div>
    </div>
  )
}
