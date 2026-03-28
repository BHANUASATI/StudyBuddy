"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Settings, 
  Target, 
  Clock, 
  Award, 
  Zap, 
  TrendingUp,
  Activity,
  Star,
  ChevronRight,
  BarChart3,
  FileText,
  Video,
  Download,
  Bell,
  Search,
  Filter,
  MoreVertical,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  RefreshCw,
  Lightbulb
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")
  const [notifications, setNotifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isStudent = user?.role === "student"
  const isTutor = user?.role === "tutor"

  // Student-specific data
  const studentStats = [
    { label: "Study Hours", value: "24.5", icon: Clock, color: "from-mint to-soft-blue", trend: "+12%" },
    { label: "Completed", value: "18", icon: Award, color: "from-soft-blue to-lavender", trend: "+8%" },
    { label: "Streak", value: "7", icon: Target, color: "from-lavender to-coral", trend: "+2" },
    { label: "Points", value: "1,250", icon: Star, color: "from-coral to-sunset", trend: "+150" }
  ]

  // Tutor-specific data
  const tutorStats = [
    { label: "Students", value: "42", icon: Users, color: "from-mint to-soft-blue", trend: "+5" },
    { label: "Sessions", value: "128", icon: Calendar, color: "from-soft-blue to-lavender", trend: "+12%" },
    { label: "Rating", value: "4.8", icon: Star, color: "from-lavender to-coral", trend: "+0.2" },
    { label: "Earnings", value: "$3,240", icon: TrendingUp, color: "from-coral to-sunset", trend: "+18%" }
  ]

  const stats = isTutor ? tutorStats : studentStats

  // Student actions
  const studentActions = [
    { 
      title: "Find Tutors", 
      description: "Connect with expert tutors",
      icon: Users, 
      href: "/matchmaking",
      gradient: "from-mint/10 to-soft-blue/10",
      borderColor: "border-mint/20"
    },
    { 
      title: "AI Assistant", 
      description: "Get help from AI tutor",
      icon: MessageSquare, 
      href: "/ai-chat",
      gradient: "from-soft-blue/10 to-lavender/10",
      borderColor: "border-soft-blue/20"
    },
    { 
      title: "Schedule", 
      description: "Book tutoring sessions",
      icon: Calendar, 
      href: "/calendar",
      gradient: "from-lavender/10 to-coral/10",
      borderColor: "border-lavender/20"
    },
    { 
      title: "Flashcards", 
      description: "Study with flashcards",
      icon: BookOpen, 
      href: "/flashcards",
      gradient: "from-coral/10 to-sunset/10",
      borderColor: "border-coral/20"
    }
  ]

  // Tutor actions
  const tutorActions = [
    { 
      title: "My Students", 
      description: "Manage your students",
      icon: Users, 
      href: "/my-students",
      gradient: "from-mint/10 to-soft-blue/10",
      borderColor: "border-mint/20"
    },
    { 
      title: "Schedule", 
      description: "View your calendar",
      icon: Calendar, 
      href: "/calendar",
      gradient: "from-soft-blue/10 to-lavender/10",
      borderColor: "border-soft-blue/20"
    },
    { 
      title: "Earnings", 
      description: "Track your earnings",
      icon: TrendingUp, 
      href: "/earnings",
      gradient: "from-lavender/10 to-coral/10",
      borderColor: "border-lavender/20"
    },
    { 
      title: "Resources", 
      description: "Manage teaching materials",
      icon: FileText, 
      href: "/resources",
      gradient: "from-coral/10 to-sunset/10",
      borderColor: "border-coral/20"
    }
  ]

  const actions = isTutor ? tutorActions : studentActions

  // Recent activity data
  const recentActivity = isStudent ? [
    { title: "Math Session", time: "2h ago", type: "session", status: "completed", score: undefined },
    { title: "Physics Quiz", time: "5h ago", type: "achievement", status: "passed", score: "92%" },
    { title: "Study Group", time: "1d ago", type: "session", status: "attended", score: undefined },
    { title: "New Message", time: "2d ago", type: "message", status: "unread", score: undefined }
  ] : [
    { title: "Session with John", time: "1h ago", type: "session", status: "completed", score: undefined, earnings: "$45" },
    { title: "New Student", time: "3h ago", type: "achievement", status: "enrolled", score: undefined },
    { title: "Group Session", time: "5h ago", type: "session", status: "completed", score: undefined, earnings: "$120" },
    { title: "Resource Upload", time: "1d ago", type: "achievement", status: "published", score: undefined }
  ]

  // Upcoming sessions
  const upcomingSessions = isStudent ? [
    { time: "10:00 AM", subject: "Mathematics", tutor: "Dr. Smith", duration: "1h" },
    { time: "2:00 PM", subject: "Physics", tutor: "Prof. Johnson", duration: "45min" },
    { time: "4:30 PM", subject: "Chemistry", tutor: "Dr. Williams", duration: "1h" }
  ] : [
    { time: "11:00 AM", subject: "Mathematics", student: "Alice Johnson", duration: "1h" },
    { time: "3:00 PM", subject: "Physics", student: "Bob Smith", duration: "45min" },
    { time: "5:00 PM", subject: "Group Session", student: "5 students", duration: "2h" }
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleMarkAllRead = () => {
    setNotifications(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-2 sm:p-3 lg:p-4 min-h-screen">
        {/* Header */}
        <div className={`mb-4 lg:mb-6 animate-fade-in transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} md:pt-4 pt-20`}>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                {isStudent ? "Here's your learning dashboard - track your progress and achieve your goals!" : "Here's your teaching dashboard - manage students and grow your impact!"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm w-full sm:w-48 lg:w-64"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="relative hover-scale">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                  )}
                </Button>
              </div>

              {/* Quick Actions */}
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold px-4 py-2 text-sm btn-hover-accent rounded-lg hover-scale w-full sm:w-auto">
                <Zap className="w-4 h-4 mr-2 icon-hover-bounce" />
                Quick Action
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 animate-slide-up transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-3 sm:p-4 bg-card/50 border border-border/50 hover-lift card-hover-glow rounded-lg">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${stat.color} p-1.5 sm:p-2 hover-scale`}>
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white icon-hover-pulse" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{stat.trend}</span>
                  {stat.trend.startsWith('+') && <ArrowUp className="w-3 h-3 text-green-500" />}
                  {stat.trend.startsWith('-') && <ArrowDown className="w-3 h-3 text-red-500" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r ${stat.color} to-accent bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-4 lg:space-y-6">
            {/* Role Card */}
            <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover-lift card-hover-shine rounded-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                    {isStudent ? "Your Learning Journey" : "Your Teaching Impact"}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="capitalize bg-accent text-accent-foreground px-3 py-1 text-xs">
                      {user?.role}
                    </Badge>
                    {isStudent && (
                      <Badge variant="outline" className="border-lavender/30 text-lavender px-3 py-1 text-xs">
                        Level {Math.floor(Math.random() * 5) + 1}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-mint/30 text-mint px-3 py-1 text-xs">
                      {isStudent ? "Active Learner" : "Top Tutor"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isStudent 
                      ? "You're making great progress! Keep up the excellent work and continue building your knowledge foundation."
                      : "You're making a real difference in students' lives. Your dedication and expertise are truly appreciated."
                    }
                  </p>
                </div>
                <Button variant="outline" size="sm" className="btn-hover-lavender rounded-lg hover-scale w-full lg:w-auto">
                  <Target className="w-4 h-4 mr-2 icon-hover-bounce" />
                  {isStudent ? "Set Goals" : "View Analytics"}
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{isStudent ? "Weekly Progress" : "Monthly Goals"}</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-mint via-soft-blue to-lavender h-2 rounded-full animate-pulse-glow" style={{ width: '75%' }} />
                </div>
              </div>
            </Card>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {actions.map((action, idx) => (
                <Link key={idx} href={action.href}>
                  <Card
                    className={`p-4 sm:p-6 bg-gradient-to-br ${action.gradient} border ${action.borderColor} hover:border-accent/50 cursor-pointer transition-all animate-slide-up hover-lift-lg card-hover-shine rounded-lg group`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${action.gradient.replace('/10', '/30')} p-2.5 sm:p-3 group-hover:scale-110 transition-transform hover-glow`}>
                        <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent icon-hover-spin" />
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-accent transition-all icon-hover-bounce" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-accent transition-colors text-hover-gradient">
                      {action.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover-lift rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-soft-blue via-lavender to-coral bg-clip-text text-transparent">
                  Recent Activity
                </h3>
                <Button variant="ghost" size="sm" className="hover-scale">
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {recentActivity.slice(0, 3).map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors hover-slide">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${
                      activity.type === 'session' ? 'from-mint to-soft-blue' :
                      activity.type === 'achievement' ? 'from-lavender to-coral' :
                      'from-soft-blue to-lavender'
                    } flex items-center justify-center hover-scale`}>
                      {activity.type === 'session' && <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white icon-hover-pulse" />}
                      {activity.type === 'achievement' && <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white icon-hover-spin" />}
                      {activity.type === 'message' && <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white icon-hover-bounce" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <p className="font-medium text-sm link-hover-slide truncate">{activity.title}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {activity.status}
                        </Badge>
                        {activity.score && <span className="text-xs text-accent font-medium">{activity.score}</span>}
                        {'earnings' in activity && activity.earnings && <span className="text-xs text-green-500 font-medium">{activity.earnings}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {recentActivity.length > 3 && (
                <Button variant="outline" className="w-full mt-4 btn-hover-coral rounded-lg hover-scale">
                  View All Activity
                </Button>
              )}
            </Card>
          </div>

        {/* Right Sidebar */}
        <div className="space-y-4 lg:space-y-6">
          {/* Profile Card */}
          <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover-lift card-hover-glow rounded-lg">
            <h3 className="font-bold text-base sm:text-lg mb-4 bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
              Profile
            </h3>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center hover-scale">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white icon-hover-pulse" />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-lg">{user?.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span className="font-medium">Year {user?.year || 'N/A'}</span>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Subjects</p>
                <div className="flex flex-wrap gap-1">
                  {(user?.subjects || ['Math', 'Science']).slice(0, 3).map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              {isTutor && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">$25/hr</span>
                </div>
              )}
            </div>
            <Link href="/settings">
              <Button variant="outline" className="w-full mt-4 btn-hover-lavender rounded-lg hover-scale">
                Edit Profile
              </Button>
            </Link>
          </Card>

            {/* Upcoming Sessions */}
            <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover-lift rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base sm:text-lg bg-gradient-to-r from-soft-blue via-lavender to-coral bg-clip-text text-transparent">
                  {isStudent ? "Upcoming Sessions" : "Today's Schedule"}
                </h3>
                <Button variant="ghost" size="sm" className="hover-scale">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {upcomingSessions.slice(0, 2).map((session, idx) => (
                  <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors hover-slide">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-soft-blue to-lavender flex items-center justify-center hover-scale">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white icon-hover-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{session.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{session.time}</span>
                        <span>•</span>
                        <span>{session.duration}</span>
                      </div>
                      <p className="text-xs text-accent mt-1">
                        {isStudent ? ('tutor' in session && session.tutor) : ('student' in session && session.student)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/calendar">
                <Button variant="outline" className="w-full mt-4 btn-hover-coral rounded-lg hover-scale">
                  View Calendar
                </Button>
              </Link>
            </Card>

            {/* Tips Card */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-mint/5 to-soft-blue/5 border border-accent/20 animate-slide-up hover-lift card-hover-shine rounded-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3 bg-gradient-to-r from-lavender via-coral to-mint bg-clip-text text-transparent">
                {isStudent ? "Study Tip" : "Teaching Tip"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {isStudent 
                  ? "Review your notes within 24 hours after class to improve retention by up to 60%. Try explaining concepts to someone else to reinforce your understanding."
                  : "Use visual aids and real-world examples to make complex topics easier to understand. Personalized feedback helps students stay engaged."
                }
              </p>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent icon-hover-bounce" />
                <span className="text-xs text-muted-foreground">Daily tip</span>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover-lift rounded-lg">
              <h3 className="font-bold text-base sm:text-lg mb-4 bg-gradient-to-r from-coral via-sunset to-mint bg-clip-text text-transparent">
                Quick Stats
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">+12%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">87%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Session</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-lavender" />
                    <span className="text-sm font-medium">45min</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
