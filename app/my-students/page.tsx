"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import { Users, MessageSquare, Calendar, Star, TrendingUp, BookOpen, ChevronRight, Mail, Video } from "lucide-react"

export default function MyStudentsPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
    if (!isLoading && user && user?.role !== 'tutor' && user?.role !== 'both') {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      subjects: ["Mathematics", "Physics"],
      progress: 85,
      nextSession: "Today, 3:00 PM",
      rating: 4.8,
      totalSessions: 24,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      subjects: ["Chemistry"],
      progress: 72,
      nextSession: "Tomorrow, 10:00 AM",
      rating: 4.9,
      totalSessions: 18,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      subjects: ["Biology", "Chemistry"],
      progress: 91,
      nextSession: "Friday, 2:00 PM",
      rating: 5.0,
      totalSessions: 32,
      avatar: "ER"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@example.com",
      subjects: ["Mathematics"],
      progress: 68,
      nextSession: "Saturday, 11:00 AM",
      rating: 4.7,
      totalSessions: 15,
      avatar: "DK"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className={`mb-6 lg:mb-8 animate-fade-in pt-16 md:pt-0 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                My Students 👥
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Track your students' progress and manage your teaching schedule
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base btn-hover-accent rounded-xl">
                <Users className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {[
            { label: "Total Students", value: students.length, color: "from-mint", icon: Users },
            { label: "Avg. Progress", value: "79%", color: "from-soft-blue", icon: TrendingUp },
            { label: "This Week", value: "12", color: "from-lavender", icon: Calendar },
            { label: "Avg. Rating", value: "4.85", color: "from-accent", icon: Star },
          ].map((stat, idx) => (
            <Card key={idx} className="p-4 sm:p-6 bg-card/50 border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} to-accent animate-pulse`} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} to-accent bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {students.map((student, idx) => (
            <Card
              key={student.id}
              className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center text-white font-bold">
                    {student.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{student.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {student.subjects.map((subject, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{student.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        student.progress >= 80 ? 'bg-green-500' :
                        student.progress >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Next: {student.nextSession}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{student.totalSessions} sessions</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                <Button variant="outline" size="sm" className="flex-1 btn-hover-lavender rounded-lg">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1 btn-hover-coral rounded-lg">
                  <Video className="w-4 h-4 mr-2" />
                  Session
                </Button>
                <Button variant="ghost" size="sm" className="btn-hover-accent rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
