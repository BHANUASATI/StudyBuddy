"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import { TrendingUp, DollarSign, Calendar, Users, Star, Download, Filter, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react"

export default function EarningsPage() {
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

  const earnings = [
    { month: "Jan", amount: 850, sessions: 34 },
    { month: "Feb", amount: 920, sessions: 38 },
    { month: "Mar", amount: 1100, sessions: 42 },
    { month: "Apr", amount: 980, sessions: 39 },
    { month: "May", amount: 1240, sessions: 48 },
    { month: "Jun", amount: 1350, sessions: 52 },
  ]

  const recentTransactions = [
    { id: 1, student: "Sarah Johnson", amount: 50, date: "Jun 28, 2024", type: "session", status: "completed" },
    { id: 2, student: "Michael Chen", amount: 75, date: "Jun 27, 2024", type: "session", status: "completed" },
    { id: 3, student: "Emily Rodriguez", amount: 50, date: "Jun 26, 2024", type: "session", status: "completed" },
    { id: 4, student: "David Kim", amount: 100, date: "Jun 25, 2024", type: "package", status: "completed" },
    { id: 5, student: "Jessica Taylor", amount: 50, date: "Jun 24, 2024", type: "session", status: "pending" },
  ]

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0)
  const avgMonthly = totalEarnings / earnings.length
  const totalSessions = earnings.reduce((sum, earning) => sum + earning.sessions, 0)
  const avgPerSession = totalEarnings / totalSessions

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className={`mb-6 lg:mb-8 animate-fade-in pt-16 md:pt-0 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Earnings 💰
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Track your income and monitor your teaching performance
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" className="btn-hover-lavender rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base btn-hover-accent rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {[
            { 
              label: "Total Earnings", 
              value: `$${totalEarnings.toLocaleString()}`, 
              color: "from-mint", 
              icon: DollarSign,
              change: "+12%",
              trend: "up"
            },
            { 
              label: "Avg. Monthly", 
              value: `$${Math.round(avgMonthly).toLocaleString()}`, 
              color: "from-soft-blue", 
              icon: TrendingUp,
              change: "+8%",
              trend: "up"
            },
            { 
              label: "Total Sessions", 
              value: totalSessions, 
              color: "from-lavender", 
              icon: Calendar,
              change: "+15%",
              trend: "up"
            },
            { 
              label: "Avg/Session", 
              value: `$${Math.round(avgPerSession)}`, 
              color: "from-accent", 
              icon: Users,
              change: "+5%",
              trend: "up"
            },
          ].map((stat, idx) => (
            <Card key={idx} className="p-4 sm:p-6 bg-card/50 border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} to-accent bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Earnings Chart */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-mint via-soft-blue to-lavender bg-clip-text text-transparent">
                  Monthly Earnings
                </h3>
                <Badge variant="outline" className="border-lavender/30 text-lavender">
                  Last 6 months
                </Badge>
              </div>
              
              <div className="space-y-4">
                {earnings.map((earning, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium text-muted-foreground">
                      {earning.month}
                    </div>
                    <div className="flex-1">
                      <div className="relative h-8 bg-border rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-mint to-soft-blue rounded-full transition-all duration-1000 hover-lift"
                          style={{ 
                            width: `${(earning.amount / Math.max(...earnings.map(e => e.amount))) * 100}%`,
                            animationDelay: `${idx * 100}ms`
                          }}
                        >
                          <div className="h-full flex items-center justify-end pr-3">
                            <span className="text-xs font-semibold text-white">${earning.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <div className="text-sm font-medium">${earning.amount}</div>
                      <div className="text-xs text-muted-foreground">{earning.sessions} sessions</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-soft-blue via-lavender to-coral bg-clip-text text-transparent">
                  Recent Transactions
                </h3>
                <Button variant="ghost" size="sm" className="btn-hover-accent">
                  <CreditCard className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentTransactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      transaction.status === 'completed' 
                        ? 'bg-green-500/10' 
                        : 'bg-yellow-500/10'
                    }`}>
                      <DollarSign className={`w-4 h-4 ${
                        transaction.status === 'completed' 
                          ? 'text-green-500' 
                          : 'text-yellow-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{transaction.student}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${transaction.amount}</p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4 btn-hover-coral rounded-lg">
                View All Transactions
              </Button>
            </Card>

            {/* Payout Info */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-mint/5 to-soft-blue/5 border border-accent/20 animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl">
              <h3 className="font-semibold mb-3 bg-gradient-to-r from-lavender via-coral to-mint bg-clip-text text-transparent">
                Next Payout
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">$450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">July 1, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">Bank Transfer</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 btn-hover-lavender rounded-lg">
                Update Payment Info
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
