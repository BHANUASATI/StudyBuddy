"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Switch } from "@/src/components/ui/switch"
import { Settings, Moon, Sun, Palette, User, Shield, Bell } from "lucide-react"

const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science", "Economics"]
const YEARS = [1, 2, 3, 4]

export default function SettingsPage() {
  const router = useRouter()
  const { user, isLoading, updateProfile } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Profile form state
  const [name, setName] = useState(user?.name || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [year, setYear] = useState(user?.year || 1)
  const [role, setRole] = useState(user?.role || "student")
  const [subjects, setSubjects] = useState(user?.subjects || [])

  // Preferences
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const toggleSubject = (subject: string) => {
    setSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateProfile({
        name,
        bio,
        year,
        role: role as any,
        subjects,
      })
      // Show success message
      setTimeout(() => setIsSaving(false), 500)
    } catch (err) {
      console.error("Failed to save profile", err)
      setIsSaving(false)
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in pt-16 md:pt-0">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-accent" />
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your profile, preferences, and theme</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border/50">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="p-6 bg-card/50 border border-border/50">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="opacity-60 cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                {/* Role */}
                <div className="space-y-3">
                  <Label>Role</Label>
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

                {/* Year */}
                <div className="space-y-2">
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
                          subjects.includes(subject)
                            ? "border-accent bg-accent/10"
                            : "border-border/50 hover:border-border"
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-6 mt-6">
            <Card className="p-6 bg-card/50 border border-border/50">
              <h2 className="text-xl font-bold mb-6">Theme Preferences</h2>

              {/* Dark Mode Toggle */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
                  <div className="flex items-center gap-4">
                    {isDarkMode ? <Moon className="w-6 h-6 text-accent" /> : <Sun className="w-6 h-6 text-accent" />}
                    <div>
                      <h3 className="font-semibold">{isDarkMode ? "Dark Mode" : "Light Mode"}</h3>
                      <p className="text-xs text-muted-foreground">
                        {isDarkMode ? "Easy on the eyes in low light environments" : "Bright and clear for daytime use"}
                      </p>
                    </div>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                </div>

                {/* Color Scheme Info */}
                <Card className="p-4 bg-gradient-to-br from-mint/10 to-soft-blue/10 border border-accent/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Your Color Scheme
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Study Buddy uses a modern dark theme with beautiful pastel accent colors for better focus and
                    reduced eye strain.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-mint" />
                      <span className="text-sm">Mint - Primary accent color</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-lavender" />
                      <span className="text-sm">Lavender - Secondary accent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-soft-blue" />
                      <span className="text-sm">Soft Blue - Tertiary accent</span>
                    </div>
                  </div>
                </Card>

                {/* Preview */}
                <Card className="p-6 bg-background/50 border border-border/50">
                  <h4 className="font-semibold mb-4">Preview</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Primary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6 bg-card/50 border border-border/50">
              <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                {[
                  {
                    id: "push",
                    label: "Push Notifications",
                    description: "Get notified about study sessions and messages",
                    value: notifications,
                    onChange: setNotifications,
                  },
                  {
                    id: "email",
                    label: "Email Updates",
                    description: "Receive weekly summaries and recommendations",
                    value: emailUpdates,
                    onChange: setEmailUpdates,
                  },
                  {
                    id: "reminders",
                    label: "Study Reminders",
                    description: "Get reminders for your scheduled study sessions",
                    value: true,
                    onChange: () => {},
                  },
                ].map(({ id, label, description, value, onChange }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30"
                  >
                    <div>
                      <h4 className="font-semibold">{label}</h4>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Switch checked={value} onCheckedChange={onChange} />
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                Save Preferences
              </Button>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6 mt-6">
            <Card className="p-6 bg-card/50 border border-border/50">
              <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>

              <div className="space-y-6">
                {/* Profile Visibility */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Profile Visibility</h3>
                  <div className="space-y-2">
                    {["Public", "Private", "Visible to Tutors Only"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-background/30 cursor-pointer"
                      >
                        <input type="radio" name="visibility" value={option} defaultChecked={option === "Public"} />
                        <span className="text-sm font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Change Password */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Security</h3>
                  <Button variant="outline" className="w-full bg-transparent">
                    Change Password
                  </Button>
                </div>

                {/* Data */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Data</h3>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                  <p className="text-xs text-muted-foreground">This action is permanent and cannot be undone.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
