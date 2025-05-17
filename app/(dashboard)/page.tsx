import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart3,
  Clock,
  Facebook,
  Instagram,
  MessageSquare,
  Send,
  Shield,
  TrendingUp,
  Twitter,
  Zap,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Smart DCA, Build Digital Assets Effortlessly
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Through our intelligent DCA service, you can easily invest in digital markets regularly, reduce
                    market volatility risk, and achieve long-term stable growth.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button size="lg" className="gap-1">
                      Start Investing
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src="/images/character.png"
                    alt="Digital Asset Investment Chart"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">$100M+</div>
                <div className="text-sm text-muted-foreground">Assets Managed</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">System Availability</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Our DCA Service</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  We provide intelligent, secure, and convenient digital market DCA solutions to help you achieve
                  long-term wealth growth
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Automated DCA</h3>
                  <p className="text-muted-foreground">
                    Set it once, and the system automatically executes your DCA plan, saving your valuable time with no
                    manual operations needed.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Smart Analysis</h3>
                  <p className="text-muted-foreground">
                    Based on market data and historical performance, we provide intelligent analysis and investment
                    advice to optimize your portfolio.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Security Guarantee</h3>
                  <p className="text-muted-foreground">
                    We use bank-level security measures to protect your funds and personal information, ensuring safe
                    and reliable transactions.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Flexible Strategies</h3>
                  <p className="text-muted-foreground">
                    We offer multiple DCA strategies that can be customized according to your risk preferences and
                    investment goals.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                  <p className="text-muted-foreground">
                    View your portfolio performance anytime, get real-time market dynamics and investment return
                    analysis.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 border rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">One-Click Withdrawal</h3>
                  <p className="text-muted-foreground">
                    Withdraw your funds anytime with one click, flexibly manage your investments with no complicated
                    processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How DCA Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Three simple steps to start your smart DCA journey
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Create Account</h3>
                  <p className="text-muted-foreground">
                    Register an account and complete identity verification to ensure your investment is safe and
                    reliable.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Set Up DCA Plan</h3>
                  <p className="text-muted-foreground">
                    Choose the digital assets you're interested in, set the investment amount and frequency, and
                    customize your exclusive DCA plan.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Enjoy Growth</h3>
                  <p className="text-muted-foreground">
                    The system automatically executes your DCA plan, and you can check your investment performance and
                    earnings analysis anytime.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="gap-1">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Hear from our community of investors about their experience with our DCA service
                </p>
              </div>
            </div>

            <div className="relative mt-12 overflow-hidden">
              {/* Auto-scrolling testimonials carousel */}
              <div className="testimonial-carousel w-full overflow-hidden">
                <div className="testimonial-track flex animate-scroll gap-6 py-4">
                  {/* First set of testimonials */}
                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "I've been using this DCA service for over a year now. The system is incredibly stable, easy to
                        use, and most importantly, it has helped me develop good investment habits while steadily
                        growing my assets."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Michael Chen</p>
                        <p className="text-xs text-muted-foreground">IT Engineer</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "As a beginner investor, this platform has been incredibly helpful. The smart analysis features
                        help me better understand the market, and the automatic DCA ensures I never miss an investment
                        opportunity."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Marketing Specialist</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "The security and transparency of this platform give me peace of mind. Customer service is also
                        very professional, promptly addressing any questions. Highly recommend to anyone looking for
                        long-term investments."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">David Wang</p>
                        <p className="text-xs text-muted-foreground">Financial Analyst</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "The automated investment feature has completely changed how I approach digital assets. I no
                        longer stress about timing the market - the system does it all for me while I focus on my
                        career."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Emma Rodriguez</p>
                        <p className="text-xs text-muted-foreground">Software Developer</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "I've tried several DCA platforms, but this one stands out for its intuitive interface and
                        comprehensive analytics. The performance reports help me understand exactly how my investments
                        are growing."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">James Wilson</p>
                        <p className="text-xs text-muted-foreground">Business Consultant</p>
                      </div>
                    </div>
                  </div>

                  {/* Second set of testimonials (duplicated for continuous scrolling) */}
                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "The flexibility of this service is what I appreciate most. I can adjust my investment strategy
                        as my financial situation changes, and the platform adapts seamlessly to my needs."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Olivia Kim</p>
                        <p className="text-xs text-muted-foreground">Entrepreneur</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "As someone who's always been intimidated by investing, this platform has been a game-changer.
                        The educational resources combined with the automated DCA have given me confidence in my
                        financial future."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Thomas Brown</p>
                        <p className="text-xs text-muted-foreground">Teacher</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "The customer support team deserves special mention. Whenever I've had questions about my
                        investment strategy, they've provided thoughtful, personalized advice that has truly added
                        value."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Sophia Martinez</p>
                        <p className="text-xs text-muted-foreground">Healthcare Professional</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "I appreciate how this platform makes complex investment strategies accessible to everyone. The
                        regular updates and market insights have helped me become a more informed investor."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Daniel Lee</p>
                        <p className="text-xs text-muted-foreground">Civil Engineer</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "The peace of mind that comes with knowing my investments are being handled systematically is
                        invaluable. This service has removed the emotional aspect of investing that often led to poor
                        decisions in the past."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Rachel Thompson</p>
                        <p className="text-xs text-muted-foreground">Psychologist</p>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate first set for seamless looping */}
                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "I've been using this DCA service for over a year now. The system is incredibly stable, easy to
                        use, and most importantly, it has helped me develop good investment habits while steadily
                        growing my assets."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Michael Chen</p>
                        <p className="text-xs text-muted-foreground">IT Engineer</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 p-6 border rounded-lg min-w-[300px] max-w-[350px] flex-shrink-0">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        "As a beginner investor, this platform has been incredibly helpful. The smart analysis features
                        help me better understand the market, and the automatic DCA ensures I never miss an investment
                        opportunity."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted h-10 w-10"></div>
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Marketing Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient overlays for smooth visual transition */}
              <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">Common questions about our DCA service</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-12">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">What is digital market DCA?</h3>
                <p className="text-muted-foreground">
                  Digital market DCA is an investment strategy that reduces market volatility risk and achieves
                  long-term stable growth by regularly investing fixed amounts to purchase digital assets.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How much money do I need to start DCA?</h3>
                <p className="text-muted-foreground">
                  Our platform supports low-threshold investment. You can flexibly set your investment amount according
                  to your financial situation, with no minimum limit.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How is my money kept safe?</h3>
                <p className="text-muted-foreground">
                  We use bank-level security measures, including multi-layer encryption, cold and hot wallet separation
                  storage, multi-signature technology, and more to ensure your funds are secure.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I withdraw my funds at any time?</h3>
                <p className="text-muted-foreground">
                  Yes, you can withdraw your funds at any time without lock-up period restrictions, giving you flexible
                  management of your investments.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How do I start using the DCA service?</h3>
                <p className="text-muted-foreground">
                  Simply register an account, complete identity verification, set up your DCA plan, and the system will
                  automatically execute DCA operations for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Start Your Smart DCA Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join thousands of investors and build your digital assets through smart DCA
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-1">
                    Sign Up Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 flex flex-col justify-center items-center">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-base font-medium">Follow Us</h3>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Twitter className="h-6 w-6" />
                  <span className="text-xs">Twitter</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Facebook className="h-6 w-6" />
                  <span className="text-xs">Facebook</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Instagram className="h-6 w-6" />
                  <span className="text-xs">Instagram</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Send className="h-6 w-6" />
                  <span className="text-xs">Telegram</span>
                </div>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-xs">Discord</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="font-bold">Smart Invest Digital</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Smart Invest Digital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
