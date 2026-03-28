"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { Button } from "@/src/components/ui/button"
import { LayoutDashboard, Users, MessageSquare, Calendar, BookOpen, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/matchmaking", label: "Find Tutors", icon: Users },
  { href: "/ai-chat", label: "AI Chat", icon: MessageSquare },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/flashcards", label: "Flashcards", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function NavSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/landing")
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden p-3 rounded-lg bg-accent/20 border border-accent/50 hover:bg-accent/30 hover:border-accent hover-scale transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Menu className={`w-6 h-6 text-accent transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-card/50 border-b border-border/50 backdrop-blur p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint via-soft-blue to-lavender flex items-center justify-center hover-glow">
            <BookOpen className="w-6 h-6 text-foreground font-bold icon-hover-spin" />
          </div>
          <span className="text-xl font-bold text-hover-gradient">Study Buddy</span>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card/50 border-r border-border/50 backdrop-blur p-6 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:fixed md:top-0 md:left-0 z-40`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 hover-scale cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mint to-soft-blue flex items-center justify-center hover-glow">
            <BookOpen className="w-6 h-6 text-foreground icon-hover-spin" />
          </div>
          <span className="text-xl font-bold text-hover-gradient">Study Buddy</span>
        </div>

        {/* User Info */}
        <div className="mb-8 p-4 rounded-lg bg-background/50 border border-border/50 card-hover-shine">
          <p className="text-sm text-muted-foreground">Welcome,</p>
          <p className="font-semibold text-balance text-hover-gradient">{user?.name}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8 flex-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <button
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 nav-hover-slide ${
                  isActive(href)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-background/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5 icon-hover-bounce" />
                <span className="link-hover-slide">{label}</span>
              </button>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <Button onClick={handleLogout} variant="outline" className="w-full flex items-center gap-2 bg-transparent btn-hover-coral hover-scale">
          <LogOut className="w-4 h-4 icon-hover-spin" />
          <span className="link-hover-slide">Logout</span>
        </Button>
      </aside>

      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
