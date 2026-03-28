"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { ArrowLeft, Users, MessageSquare, BookOpen, Calendar, Star, Zap, Shield, Globe, Sparkles, ChevronRight } from "lucide-react"

export default function FeaturesPage() {
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
            <Link href="/features" className="text-accent font-medium transition-colors link-hover-underline">Features</Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-accent transition-colors btn-hover-lavender font-medium link-hover-underline">How It Works</Link>
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
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Powerful Features</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
              Everything You Need to Succeed
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover the comprehensive suite of tools designed to enhance your learning experience, connect you with the right people, and help you achieve your academic goals.
          </p>
        </section>

        {/* Main Features Grid */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Smart Matching",
                description: "Our AI-powered algorithm analyzes your learning style, schedule, and goals to connect you with the perfect tutors and study groups.",
                gradient: "from-mint via-soft-blue to-lavender",
                features: ["AI-Powered Matching", "Personalized Recommendations", "Schedule Sync"]
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                description: "Get instant answers to your questions with our intelligent AI assistant that understands your context and learning needs.",
                gradient: "from-soft-blue via-lavender to-coral",
                features: ["24/7 Availability", "Voice Support", "Context-Aware Responses"]
              },
              {
                icon: BookOpen,
                title: "Smart Flashcards",
                description: "AI-generated flashcards that adapt to your learning pace and focus on areas where you need the most improvement.",
                gradient: "from-lavender via-coral to-mint",
                features: ["Spaced Repetition", "Visual Learning", "Progress Tracking"]
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Intelligent calendar management that finds the best times for study sessions and automatically sends reminders.",
                gradient: "from-coral via-mint to-soft-blue",
                features: ["Auto-Scheduling", "Conflict Detection", "Smart Reminders"]
              },
              {
                icon: Star,
                title: "Progress Tracking",
                description: "Comprehensive analytics and insights to monitor your learning progress and identify areas for improvement.",
                gradient: "from-mint via-aurora to-soft-blue",
                features: ["Detailed Analytics", "Goal Setting", "Performance Insights"]
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Enterprise-grade security ensures your data and conversations are always protected and private.",
                gradient: "from-soft-blue via-lavender to-coral",
                features: ["End-to-End Encryption", "Privacy Protection", "Secure Payments"]
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                <Card className="relative p-8 bg-card/50 border border-border/50 hover:bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-slide-up hover-lift rounded-2xl">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover-glow`}>
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-mint to-soft-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full group-hover:bg-accent/10 transition-all duration-300 btn-hover-accent font-semibold px-6 py-3 text-base">
                    Learn More <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
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
                Ready to Transform Your Learning?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already using Study Buddy to achieve their academic goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-2xl font-semibold px-10 py-5 text-lg btn-hover-coral">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="px-10 py-5 text-lg border-2 hover:bg-accent/20 transition-all duration-300 btn-hover-lavender font-semibold">
                    See How It Works
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
