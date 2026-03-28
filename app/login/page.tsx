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
import { BookOpen, ArrowLeft, Eye, EyeOff, Mail, Lock, Sparkles, Github, Twitter } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card particle-bg overflow-hidden flex items-center justify-center px-4 relative">
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
            Back
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
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">Sign in to your Study Buddy account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-down">
                {error}
              </div>
            )}

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
                className="h-12 lg:h-14 rounded-xl border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-base lg:text-lg"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 lg:h-14 rounded-xl border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 pr-12 text-base lg:text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border/50 text-accent focus:ring-accent/20" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-accent hover:text-accent/80 transition-colors btn-hover-lavender">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold btn-hover-accent hover-scale"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card/50 text-muted-foreground">Or continue with</span>
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
            Don't have an account?{" "}
            <Link href="/signup" className="text-sm text-muted-foreground hover:text-accent link-hover-underline">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
