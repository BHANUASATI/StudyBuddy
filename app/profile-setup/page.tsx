"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import { Card } from "@/src/components/ui/card"
import { Textarea } from "@/src/components/ui/textarea"

const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science", "Economics"]
const YEARS = [1, 2, 3, 4]

export default function ProfileSetupPage() {
  const router = useRouter()
  const { user, isLoading, updateProfile } = useAuth()
  const [role, setRole] = useState<"student" | "tutor" | "both">("student")
  const [year, setYear] = useState(1)
  const [subjects, setSubjects] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [bio, setBio] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signup")
    }
  }, [user, isLoading, router])

  const toggleSubject = (subject: string) => {
    setSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      if (!user) throw new Error("Not authenticated")

      console.log("[v0] Starting profile update for user:", user.id)
      console.log("[v0] Profile data:", { role, year, subjects, skills: subjects, bio })

      await updateProfile({
        role,
        year,
        subjects,
        skills: subjects, // For now, skills = subjects
        bio,
      })

      console.log("[v0] Profile update successful")
      router.push("/dashboard")
    } catch (err) {
      console.error("[v0] Profile update error:", err)
      if (err instanceof Error) {
        setError(`Failed to update profile: ${err.message}`)
      } else {
        setError("Failed to update profile")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card py-12 px-4">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground mb-8">Tell us about yourself to get better matches</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

            {/* Role Selection */}
            <div className="space-y-3">
              <Label>I am a...</Label>
              <div className="grid grid-cols-3 gap-3">
                {(["student", "tutor", "both"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`p-4 rounded-lg border-2 transition-all capitalize font-medium ${
                      role === r ? "border-accent bg-accent/10" : "border-border/50 hover:border-border"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Selection */}
            <div className="space-y-3">
              <Label htmlFor="year">Year of Study</Label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(Number.parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Subjects */}
            <div className="space-y-3">
              <Label>Subjects of Interest</Label>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      subjects.includes(subject) ? "border-accent bg-accent/10" : "border-border/50 hover:border-border"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your learning goals, or teaching experience..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-8"
              disabled={isSubmitting || subjects.length === 0}
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
