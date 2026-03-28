"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { ArrowLeft, BookOpen, Search, Calendar, MessageCircle, Star, CheckCircle, Users, Zap, Sparkles, ChevronRight, Play } from "lucide-react"

export default function HowItWorksPage() {
  const [mounted, setMounted] = useState(false)
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

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Sign up and tell us about your learning goals, subjects, and availability.",
      icon: Users,
      gradient: "from-mint via-soft-blue to-lavender"
    },
    {
      number: "2", 
      title: "Get Matched",
      description: "Our AI analyzes your profile and matches you with perfect tutors and study groups.",
      icon: Search,
      gradient: "from-soft-blue via-lavender to-coral"
    },
    {
      number: "3",
      title: "Schedule Sessions",
      description: "Book sessions that fit your schedule with our smart calendar system.",
      icon: Calendar,
      gradient: "from-lavender via-coral to-mint"
    },
    {
      number: "4",
      title: "Start Learning",
      description: "Connect with your tutor or group and begin your personalized learning journey.",
      icon: MessageCircle,
      gradient: "from-coral via-mint to-soft-blue"
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
            <Link href="/how-it-works" className="text-accent font-medium transition-colors link-hover-underline">How It Works</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-accent transition-colors btn-hover-coral font-medium link-hover-underline">Pricing</Link>
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
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-mint/20 via-soft-blue/10 to-lavender/20 border border-accent/30 animate-bounce-subtle hover-glow">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Simple & Effective</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
              How Study Buddy Works
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes and transform your learning experience with our intelligent platform that connects you with the right resources.
          </p>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Connection Lines */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent/20 to-transparent" />
                )}
                
                <Card className="relative p-8 bg-card/50 border border-border/50 hover:bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-slide-up hover-lift rounded-2xl h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 hover-glow`}>
                      <span className="text-2xl font-bold text-foreground">{step.number}</span>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-3 mb-4 -mt-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover-glow`}>
                      <step.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-mint/5 via-soft-blue/5 to-lavender/5 border border-accent/20 rounded-3xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                  See It In Action
                </h2>
                <p className="text-lg text-muted-foreground">
                  Watch a quick demo to see how Study Buddy can transform your learning experience
                </p>
              </div>
              
              <div className="relative aspect-video bg-gradient-to-br from-card to-card/50 rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center group-hover:scale-110 transition-transform hover-glow">
                    <Play className="w-8 h-8 text-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold px-8 py-4 text-lg btn-hover-coral">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make learning effective and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "AI-Powered Matching",
              "24/7 AI Assistant", 
              "Smart Scheduling",
              "Progress Tracking",
              "Interactive Flashcards",
              "Secure Platform"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 hover:border-accent/30 transition-all duration-300 hover-lift">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
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
                Ready to Get Started?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already learning smarter with Study Buddy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-2xl font-semibold px-10 py-5 text-lg btn-hover-lavender">
                    Start Learning Now
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="px-10 py-5 text-lg border-2 hover:bg-accent/20 transition-all duration-300 btn-hover-aurora font-semibold">
                    Explore Features
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
