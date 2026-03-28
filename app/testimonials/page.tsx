"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { ArrowLeft, BookOpen, Star, Quote, Users, MessageSquare, Calendar, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      university: "Stanford University",
      avatar: "SJ",
      rating: 5,
      content: "Study Buddy completely transformed my learning experience. The AI matching system connected me with the perfect tutors, and my grades have improved significantly. I couldn't be happier!",
      gradient: "from-mint via-soft-blue to-lavender"
    },
    {
      name: "Michael Chen",
      role: "Mathematics Tutor",
      university: "MIT",
      avatar: "MC",
      rating: 5,
      content: "As a tutor, Study Buddy has helped me reach more students and manage my schedule efficiently. The platform is intuitive and the students are serious about learning.",
      gradient: "from-soft-blue via-lavender to-coral"
    },
    {
      name: "Emily Rodriguez",
      role: "Biology Student",
      university: "UCLA",
      avatar: "ER",
      rating: 5,
      content: "The AI assistant is a game-changer! I can get help 24/7, and the smart flashcards have made studying so much more effective. Highly recommend!",
      gradient: "from-lavender via-coral to-mint"
    },
    {
      name: "David Kim",
      role: "Physics Student",
      university: "Berkeley",
      avatar: "DK",
      rating: 5,
      content: "The study groups I found through Study Buddy are amazing. We collaborate on projects and help each other understand complex concepts. It's like having a study team 24/7.",
      gradient: "from-coral via-mint to-soft-blue"
    },
    {
      name: "Jessica Taylor",
      role: "Chemistry Student",
      university: "Harvard",
      avatar: "JT",
      rating: 5,
      content: "I was struggling with organic chemistry until I found Study Buddy. My tutor is patient, knowledgeable, and the scheduling system makes it easy to fit sessions into my busy schedule.",
      gradient: "from-mint via-aurora to-soft-blue"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Expert Tutors" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "Average Rating" }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
            <Link href="/pricing" className="text-muted-foreground hover:text-accent transition-colors btn-hover-coral font-medium link-hover-underline">Pricing</Link>
            <Link href="/testimonials" className="text-accent font-medium transition-colors link-hover-underline">Testimonials</Link>
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
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-lavender/20 via-coral/10 to-mint/20 border border-accent/30 animate-bounce-subtle hover-glow">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Student Success Stories</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
              What Our Students Say
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Real stories from real students who have transformed their learning journey with Study Buddy.
          </p>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Card className="p-8 lg:p-12 bg-gradient-to-br from-card/50 to-card/30 border border-accent/20 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-mint/5 via-soft-blue/5 to-lavender/5 animate-gradient-shift" />
                </div>
                
                <div className="relative z-10">
                  <Quote className="w-12 h-12 text-accent/20 mb-6" />
                  
                  <p className="text-lg lg:text-xl leading-relaxed mb-8 text-muted-foreground">
                    {testimonials[currentTestimonial].content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonials[currentTestimonial].gradient} flex items-center justify-center text-white font-bold text-xl`}>
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                        <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].university}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full hover:bg-accent/20 transition-all duration-300 btn-hover-lavender"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentTestimonial ? 'bg-accent w-8' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full hover:bg-accent/20 transition-all duration-300 btn-hover-lavender"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* All Testimonials Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
              More Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from more students who have benefited from Study Buddy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="p-6 bg-card/50 border border-border/50 hover:bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slide-up hover-lift rounded-2xl"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
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
                Join Our Success Stories
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your learning journey today and become part of our growing community of successful students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-2xl font-semibold px-10 py-5 text-lg btn-hover-aurora">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="px-10 py-5 text-lg border-2 hover:bg-accent/20 transition-all duration-300 btn-hover-coral font-semibold">
                    View Plans
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
