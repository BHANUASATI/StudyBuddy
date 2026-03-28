"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { ArrowLeft, BookOpen, Check, X, Star, Sparkles, Crown, Zap, Shield } from "lucide-react"

export default function PricingPage() {
  const [mounted, setMounted] = useState(false)
  const [billingCycle, setBillingCycle] = useState("monthly")
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: billingCycle === "monthly" ? "$0" : "$0",
      yearlyPrice: "$0",
      icon: BookOpen,
      gradient: "from-gray-400 to-gray-600",
      features: [
        "Basic profile creation",
        "Up to 5 study sessions per month",
        "AI assistant (limited)",
        "Basic flashcards",
        "Community access"
      ],
      notIncluded: [
        "Advanced matching",
        "Unlimited sessions",
        "Priority support",
        "Advanced analytics"
      ],
      popular: false,
      buttonText: "Get Started Free"
    },
    {
      name: "Student",
      description: "Most popular for students",
      price: billingCycle === "monthly" ? "$9.99" : "$7.99",
      yearlyPrice: "$95.90",
      originalPrice: "$119.88",
      icon: Star,
      gradient: "from-mint via-soft-blue to-lavender",
      features: [
        "Everything in Free",
        "Unlimited study sessions",
        "Advanced AI matching",
        "Unlimited flashcards",
        "Progress tracking",
        "Priority scheduling",
        "Email support"
      ],
      notIncluded: [
        "1-on-1 tutoring",
        "Advanced analytics",
        "Custom study plans"
      ],
      popular: true,
      buttonText: "Start Free Trial"
    },
    {
      name: "Pro",
      description: "For serious learners",
      price: billingCycle === "monthly" ? "$19.99" : "$15.99",
      yearlyPrice: "$191.90",
      originalPrice: "$239.88",
      icon: Crown,
      gradient: "from-soft-blue via-lavender to-coral",
      features: [
        "Everything in Student",
        "1-on-1 tutoring sessions",
        "Advanced analytics dashboard",
        "Custom study plans",
        "Priority AI assistant",
        "24/7 support",
        "Study group creation",
        "Advanced scheduling"
      ],
      notIncluded: [],
      popular: false,
      buttonText: "Go Pro"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card particle-bg overflow-hidden">
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => ({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
          size: Math.random() * 3 + 1
        })).map((particle) => (
          <div
            key={particle.id}
            className="particle bg-gradient-to-r from-mint via-soft-blue to-lavender rounded-full"
            style={{
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-mint/30 via-soft-blue/20 to-lavender/30 rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-lavender/30 via-coral/20 to-mint/30 rounded-full animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-soft-blue/30 via-aurora/20 to-lavender/30 rounded-full animate-float" />
      </div>

      {/* Enhanced Header/Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/50 transition-all duration-300 bg-background/90 backdrop-blur-lg shadow-lg">
        <div className="container-responsive py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Link href="/landing" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 hover-glow">
                <BookOpen className="w-6 h-6 text-foreground font-bold icon-hover-spin" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                Study Buddy
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/features" className="text-muted-foreground hover:text-accent transition-colors btn-hover-accent font-medium link-hover-underline">Features</Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-accent transition-colors btn-hover-lavender font-medium link-hover-underline">How It Works</Link>
            <Link href="/pricing" className="text-accent font-medium transition-colors link-hover-underline">Pricing</Link>
            <Link href="/testimonials" className="text-muted-foreground hover:text-accent transition-colors btn-hover-aurora font-medium link-hover-underline">Testimonials</Link>
          </nav>
          
          {/* Auth Buttons */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:flex hover:bg-accent/20 transition-all duration-300 btn-hover-accent font-medium px-6 py-3 text-base hover-scale">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-glow btn-hover-lavender font-semibold px-8 py-4 text-lg hover-scale">
                Get Started
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden hover-scale">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </nav>
        </div>
      </header>

      <div className={`container-responsive transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Back Button */}
        <div className="pt-8 pb-4">
          <Link href="/landing">
            <Button variant="ghost" className="hover:bg-accent/20 transition-all duration-300 btn-hover-accent font-medium px-6 py-3 text-base">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center py-12 sm:py-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-coral/20 via-sunset/10 to-aurora/20 border border-accent/30 animate-bounce-subtle hover-glow">
              <Crown className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Simple, Transparent Pricing</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
              Choose Your Plan
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan for your learning needs. Start free and upgrade as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative w-14 h-7 bg-gradient-to-r from-mint to-soft-blue rounded-full transition-colors"
            >
              <div className={`absolute top-1 ${billingCycle === "monthly" ? "left-1" : "left-8"} w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md`} />
            </button>
            <span className={`font-medium ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
              Save 20%
            </span>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-gradient-to-r from-mint via-soft-blue to-lavender rounded-full">
                      <span className="text-sm font-semibold text-foreground">Most Popular</span>
                    </div>
                  </div>
                )}
                
                <Card className={`relative p-8 bg-card/50 border ${plan.popular ? 'border-accent/50' : 'border-border/50'} hover:bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-slide-up hover-lift rounded-2xl h-full`}>
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 hover-glow`}>
                      <plan.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold">
                        {billingCycle === "monthly" ? plan.price : plan.yearlyPrice}
                        <span className="text-lg font-normal text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      {billingCycle === "yearly" && plan.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {plan.originalPrice}/year
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 opacity-50">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/signup">
                    <Button 
                      className={`w-full font-semibold px-6 py-4 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        plan.popular 
                          ? "bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground btn-hover-coral" 
                          : plan.name === "Free"
                          ? "bg-gradient-to-r from-gray-400 to-gray-600 hover:opacity-90 text-white btn-hover-accent"
                          : "bg-gradient-to-r from-soft-blue via-lavender to-coral hover:opacity-90 text-foreground btn-hover-lavender"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Can I change my plan anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes! All paid plans come with a 14-day free trial. No credit card required for the Free plan."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, and PayPal payments."
                },
                {
                  question: "Can I cancel anytime?",
                  answer: "Absolutely! You can cancel your subscription at any time with no cancellation fees."
                }
              ].map((faq, idx) => (
                <Card key={idx} className="p-6 bg-card/30 border border-border/30 hover:bg-card/50 hover:border-accent/30 transition-all duration-300 hover-lift">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="relative p-12 sm:p-16 lg:p-20 rounded-3xl border border-accent/20 bg-gradient-to-br from-mint/10 via-soft-blue/10 via-lavender/10 to-coral/10 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-mint/5 via-soft-blue/5 to-lavender/5 animate-gradient-shift" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-soft-blue/30 via-lavender/20 to-coral/30 rounded-full animate-float" />
              <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-mint/30 via-coral/20 to-soft-blue/30 rounded-full animate-float-delayed" />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent">
                Ready to Start Learning?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already achieving their goals with Study Buddy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-2xl font-semibold px-10 py-5 text-lg btn-hover-coral">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="px-10 py-5 text-lg border-2 hover:bg-accent/20 transition-all duration-300 btn-hover-aurora font-semibold">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
