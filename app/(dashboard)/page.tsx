import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database } from 'lucide-react';
import { Terminal } from './terminal';


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container relative space-y-16">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="bg-gradient-to-r from-primary/70 to-primary bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
                Smart Digital Market Investing Made Simple
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
                Automate your digital asset investments with our powerful DCA platform. Build wealth consistently with
                scheduled investments tailored to your goals.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" className="gap-2">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                How It Works
              </Button>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2 rounded-lg bg-muted/50 p-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why Choose Our DCA Platform</h2>
            <p className="mt-4 text-muted-foreground">
              Powerful features designed to optimize your investment strategy
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-4 rounded-lg border p-6">
                <div className="inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                Start your automated investment journey in three simple steps
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative space-y-4 rounded-lg border bg-background p-6">
                  <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary/10 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-background p-8 shadow-lg md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-4">
                <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Limited Time Offer
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Start Building Your Digital Portfolio Today</h2>
                <p className="text-muted-foreground">
                  Join thousands of smart investors who are already using our platform to build wealth through strategic
                  DCA investing.
                </p>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        ✓
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button size="lg" className="w-full md:w-auto">
                    Get Started Now
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-full max-w-sm rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 p-1">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-6 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
                        <TrendingUp className="h-10 w-10" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Average Annual Return</p>
                        <p className="text-3xl font-bold">+27.8%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-lg font-bold">DCA Platform</span>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Send className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} DCA Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const stats = [
  { label: "Active Investors", value: "10,000+" },
  { label: "Total Invested", value: "$50M+" },
  { label: "Supported Assets", value: "50+" },
]

const features = [
  {
    icon: Clock,
    title: "Automated Investing",
    description: "Set up recurring investments on your schedule - daily, weekly, or monthly.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Analytics",
    description: "Track performance with detailed analytics and customizable reports.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security to protect your investments and personal data.",
  },
]

const steps = [
  {
    title: "Create an Account",
    description: "Sign up in minutes with our simple onboarding process.",
  },
  {
    title: "Configure Your Strategy",
    description: "Select assets, investment amount, and frequency that fits your goals.",
  },
  {
    title: "Relax and Watch It Grow",
    description: "Our platform handles the rest, automatically executing your strategy.",
  },
]

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "#" },
      { label: "Security", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Supported Assets", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Learning Center", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
]

const benefits = [
  "No minimum investment required",
  "Automated investing on your schedule",
  "Advanced portfolio analytics",
  "Bank-level security for your assets",
]
