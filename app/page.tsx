"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { BookOpen, Sparkles } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, left: string, animationDelay: string, size: number}>>([])

  useEffect(() => {
    setMounted(true)
    // Generate particles only on client side
    const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      size: Math.random() * 3 + 1
    }))
    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
    if (!isLoading && mounted) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/landing")
      }
    }
  }, [user, isLoading, router, mounted])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-card particle-bg overflow-hidden">
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {mounted && particles.map((particle) => (
          <div
            key={particle.id}
            className="particle bg-gradient-to-r from-mint to-soft-blue rounded-full"
            style={{
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Logo with animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center animate-pulse-glow transform transition-all duration-300 hover:scale-110 hover-glow">
            <BookOpen className="w-12 h-12 text-foreground font-bold" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-mint via-soft-blue via-lavender to-coral bg-clip-text text-transparent animate-gradient-shift">
          Study Buddy
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
          Loading your personalized learning experience...
        </p>

        {/* Enhanced loading animation */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-mint to-soft-blue animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>

        {/* Loading progress bar */}
        <div className="mt-8 w-64 h-1 bg-border/50 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-mint to-soft-blue animate-pulse" 
               style={{
                 animation: 'progress 2s ease-in-out infinite',
               }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
