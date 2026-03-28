"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { ArrowRight, Users, BookOpen, MessageSquare, Calendar, Sparkles, Star, Zap, Globe, Mail, Phone, MapPin, Twitter, Github, Linkedin, ChevronRight, HelpCircle, FileText } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{id: number, left: string, animationDelay: string, size: number}>>([])

  useEffect(() => {
    setMounted(true)
    if (user) {
      router.push("/dashboard")
    }

    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Generate particles only on client side
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      size: Math.random() * 4 + 2
    }))
    setParticles(generatedParticles)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [user, router])


  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card particle-bg overflow-x-hidden">
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {mounted && particles.map((particle) => (
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

      {/* Enhanced Header/Navbar */}
      <header className={`sticky top-0 z-40 border-b border-border/50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-md'
      }`}>
        <div className="container-responsive py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 hover-glow">
              <BookOpen className="w-6 h-6 text-foreground font-bold" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
              Study Buddy
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/features" className="text-muted-foreground hover:text-accent transition-colors btn-hover-accent font-medium text-lg px-4 py-2 rounded-lg hover:bg-accent/10">
              Features
            </Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-accent transition-colors btn-hover-lavender font-medium text-lg px-4 py-2 rounded-lg hover:bg-accent/10">
              How It Works
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-accent transition-colors btn-hover-coral font-medium text-lg px-4 py-2 rounded-lg hover:bg-accent/10">
              Pricing
            </Link>
            <Link href="/testimonials" className="text-muted-foreground hover:text-accent transition-colors btn-hover-aurora font-medium text-lg px-4 py-2 rounded-lg hover:bg-accent/10">
              Testimonials
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:flex hover:bg-accent/20 transition-all duration-300 btn-hover-accent font-medium px-8 py-4 text-lg rounded-xl">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-glow btn-hover-lavender font-semibold px-10 py-5 text-xl rounded-xl">
                Get Started
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden hover:bg-accent/20 transition-all duration-300 p-2"
              onClick={() => {
                const mobileNav = document.getElementById('mobile-navigation');
                if (mobileNav) {
                  mobileNav.classList.toggle('hidden');
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <div id="mobile-navigation" className="hidden lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="container-responsive py-4 space-y-2">
            <div className="flex flex-col items-center space-y-2">
              <Link href="/features" className="block text-muted-foreground hover:text-accent transition-colors btn-hover-accent font-medium text-lg py-3 px-4 rounded-lg hover:bg-accent/10 text-center w-full sm:w-auto">
                Features
              </Link>
              <Link href="/how-it-works" className="block text-muted-foreground hover:text-accent transition-colors btn-hover-lavender font-medium text-lg py-3 px-4 rounded-lg hover:bg-accent/10 text-center w-full sm:w-auto">
                How It Works
              </Link>
              <Link href="/pricing" className="block text-muted-foreground hover:text-accent transition-colors btn-hover-coral font-medium text-lg py-3 px-4 rounded-lg hover:bg-accent/10 text-center w-full sm:w-auto">
                Pricing
              </Link>
              <Link href="/testimonials" className="block text-muted-foreground hover:text-accent transition-colors btn-hover-aurora font-medium text-lg py-3 px-4 rounded-lg hover:bg-accent/10 text-center w-full sm:w-auto">
                Testimonials
              </Link>
            </div>
            <div className="pt-2 border-t border-border/30">
              <div className="flex flex-col items-center">
                <Link href="/login" className="block sm:hidden w-full sm:w-auto">
                  <Button variant="ghost" className="w-full hover:bg-accent/20 transition-all duration-300 btn-hover-accent font-medium px-8 py-4 text-lg rounded-xl justify-center">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="container-responsive py-12 sm:py-20 text-center relative">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-mint/30 via-soft-blue/20 to-lavender/30 rounded-full animate-float" />
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-lavender/30 via-coral/20 to-mint/30 rounded-full animate-float-delayed" />
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-br from-soft-blue/30 via-aurora/20 to-lavender/30 rounded-full animate-float" />
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-coral/20 to-sunset/30 rounded-full animate-float" />
        </div>

        <div className={`relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-mint/20 via-soft-blue/10 to-lavender/20 border border-accent/30 mb-8 animate-bounce-subtle hover-glow">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">AI-Powered Learning Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
              Connect, Learn &
            </span>
            <span className="bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
              Grow Together
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Study Buddy connects students with qualified tutors and study groups. Get personalized learning experiences,
            AI-powered doubt solving, and smart scheduling—all in one platform designed for your success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 btn-hover-accent rounded-xl font-semibold w-full sm:w-auto">
                Start Learning <ArrowRight className="ml-2 sm:ml-4 w-5 h-5 sm:w-7 sm:h-7" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 border-2 hover:bg-gradient-to-r hover:from-soft-blue/20 hover:to-lavender/20 hover:border-soft-blue/50 transition-all duration-300 btn-hover-aurora rounded-xl font-semibold w-full sm:w-auto">
                Already a Student?
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-2xl mx-auto">
            {[
              { icon: Users, label: "Active Students", value: "10,000+" },
              { icon: Star, label: "Expert Tutors", value: "500+" },
              { icon: BookOpen, label: "Study Sessions", value: "50,000+" },
              { icon: Calendar, label: "Success Rate", value: "95%" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 sm:p-4 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 hover:border-accent/30 transition-all duration-300 hover-lift">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-accent" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-mint to-soft-blue bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container-responsive py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent">
            Why Choose Study Buddy?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make learning effective and enjoyable
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: Users,
              title: "Smart Matching",
              description: "AI-powered algorithm connects you with the perfect tutor or study group",
              gradient: "from-mint via-soft-blue to-lavender"
            },
            {
              icon: MessageSquare,
              title: "AI Assistant",
              description: "Get instant answers with voice support and personalized doubt solving",
              gradient: "from-soft-blue via-lavender to-coral"
            },
            {
              icon: BookOpen,
              title: "Smart Flashcards",
              description: "AI-generated flashcards for quick revision and better retention",
              gradient: "from-lavender via-coral to-mint"
            },
            {
              icon: Calendar,
              title: "Easy Scheduling",
              description: "Manage study sessions, deadlines, and meetings in one calendar",
              gradient: "from-coral via-mint to-soft-blue"
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
              <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-slide-up hover-lift">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-2 sm:p-3 mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover-glow`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-foreground" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                  {feature.description}
                </p>
                <Button variant="ghost" size="sm" className="mt-2 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-hover-accent font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg">
                  Learn More →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-responsive py-16 sm:py-20">
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl border border-accent/20 bg-gradient-to-br from-mint/10 via-soft-blue/10 via-lavender/10 to-coral/10 backdrop-blur-sm overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-mint/5 via-soft-blue/5 to-lavender/5 animate-gradient-shift" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-soft-blue/30 via-lavender/20 to-coral/30 rounded-full animate-float" />
            <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-mint/30 via-coral/20 to-soft-blue/30 rounded-full animate-float-delayed" />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-lavender/20 via-mint/30 to-aurora/20 rounded-full animate-float" />
          </div>
          
          <div className="relative z-10 text-center p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join hundreds of students and tutors building better study habits together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 btn-hover-coral rounded-xl font-semibold w-full sm:w-auto">
                  Create Your Account Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 border-2 hover:bg-gradient-to-r hover:from-lavender/20 hover:to-coral/20 hover:border-lavender/50 transition-all duration-300 btn-hover-coral rounded-xl font-semibold w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-border/50 mt-20 py-12 sm:py-16 bg-gradient-to-b from-card/50 to-card/80">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center hover-scale">
                  <BookOpen className="w-6 h-6 text-foreground font-bold icon-hover-spin" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                  Study Buddy
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Empowering students worldwide with AI-driven learning experiences since 2026.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center sm:justify-start">
                <Link href="#" className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint/20 to-soft-blue/20 flex items-center justify-center btn-contained-scale btn-contained-shine">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-lg bg-gradient-to-br from-soft-blue/20 to-lavender/20 flex items-center justify-center btn-contained-scale btn-contained-shine">
                  <Github className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-lg bg-gradient-to-br from-lavender/20 to-coral/20 flex items-center justify-center btn-contained-scale btn-contained-shine">
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-center sm:text-left">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <ChevronRight className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">About Us</span>
                </Link></li>
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <ChevronRight className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">Features</span>
                </Link></li>
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <ChevronRight className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">Pricing</span>
                </Link></li>
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <ChevronRight className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">Blog</span>
                </Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="lg:col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-center sm:text-left">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <HelpCircle className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">Help Center</span>
                </Link></li>
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <MessageSquare className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">Contact Us</span>
                </Link></li>
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <FileText className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">FAQs</span>
                </Link></li>
                <li><Link href="#" className="flex items-center gap-2 group cursor-pointer text-sm text-muted-foreground hover:text-accent transition-colors">
                  <Users className="w-3 h-3 text-accent icon-hover-bounce" />
                  <span className="footer-link-contained">Community</span>
                </Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Mail className="w-4 h-4 text-accent icon-hover-bounce" />
                  <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors footer-link-contained">hello@studybuddy.com</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Phone className="w-4 h-4 text-accent icon-hover-bounce" />
                  <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors footer-link-contained">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <MapPin className="w-4 h-4 text-accent icon-hover-bounce" />
                  <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors footer-link-contained">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground text-center">
                &copy; 2026 Study Buddy. Connecting learners worldwide.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
                <Link href="#" className="hover:text-accent transition-colors footer-link-contained">Privacy Policy</Link>
                <Link href="#" className="hover:text-accent transition-colors footer-link-contained">Terms of Service</Link>
                <Link href="#" className="hover:text-accent transition-colors footer-link-contained">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
