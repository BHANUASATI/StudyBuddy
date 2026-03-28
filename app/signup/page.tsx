"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card } from "@/src/components/ui/card"
import { BookOpen, ArrowLeft, Eye, EyeOff, Mail, Lock, User, Sparkles, Github, Twitter, CheckCircle, Circle } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { signup } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const passwordRequirements = [
    { regex: /.{6,}/, text: "At least 6 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[0-9]/, text: "One number" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      await signup(email, name, password)
      router.push("/profile-setup")
    } catch (err) {
      setError("Signup failed. Please try again.")
      console.error("Signup error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card particle-bg overflow-hidden flex items-center justify-center px-4 relative py-8">
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

      <div className="absolute top-4 left-4 z-10">
        <Link href="/landing">
          <Button variant="outline" className="w-full bg-transparent border-border hover:bg-card btn-hover-lavender hover-scale">
            <ArrowLeft className="w-4 h-4 mr-2 icon-hover-spin" />
            Back to home
          </Button>
        </Link>
      </div>

      <div className={`w-full max-w-md lg:max-w-lg transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Card className="p-8 sm:p-10 lg:p-12 border border-border/50 bg-card/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center animate-pulse-glow hover-glow">
              <BookOpen className="w-8 h-8 lg:w-9 lg:h-9 text-foreground font-bold" />
            </div>
            <span className="ml-3 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
              Study Buddy
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">Join Study Buddy and start learning better</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-down">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 rounded-xl border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="space-y-2 mt-3">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {req.regex.test(password) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <Circle className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className={req.regex.test(password) ? "text-green-500" : "text-muted-foreground"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirm" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="mt-1 rounded border-border/50 text-accent focus:ring-accent/20" 
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-accent hover:text-accent/80 transition-colors btn-hover-lavender">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-accent hover:text-accent/80 transition-colors btn-hover-aurora">Privacy Policy</Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold btn-hover-accent hover-scale"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create Account
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Social Signup */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card/50 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 lg:mt-8 grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 lg:h-14 rounded-xl hover:bg-gradient-to-r hover:from-gray-800/10 hover:to-gray-900/10 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg text-base lg:text-lg">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="h-12 lg:h-14 rounded-xl hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-blue-500/10 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg text-base lg:text-lg">
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-sm text-muted-foreground hover:text-accent link-hover-underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
