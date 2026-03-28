"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { TutorCard } from "@/src/components/features/matchmaking/tutor-card"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { findMatches, type MatchScore } from "@/src/lib/api/matchmaking"
import { getAllUsers, getSessionsByUser, createSession } from "@/src/lib/database/db-mock"
import { Search, Filter, ArrowDown, CheckCircle } from "lucide-react"

export default function MatchmakingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [matches, setMatches] = useState<MatchScore[]>([])
  const [filteredMatches, setFilteredMatches] = useState<MatchScore[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [sortBy, setSortBy] = useState<"match" | "name">("match")
  const [connectedUsers, setConnectedUsers] = useState<string[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const allUsers = getAllUsers()
      const matchResults = findMatches(user, allUsers)
      setMatches(matchResults)
      setFilteredMatches(matchResults)

      // Get connected users
      const sessions = getSessionsByUser(user.id)
      setConnectedUsers(sessions.map((s) => (s.tutor === user.id ? s.student : s.tutor)))
    }
  }, [user])

  // Apply filters and search
  useEffect(() => {
    let filtered = matches

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((m) => m.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by subject
    if (selectedSubject) {
      filtered = filtered.filter((m) => m.user.subjects.includes(selectedSubject))
    }

    // Sort
    if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.user.name.localeCompare(b.user.name))
    }

    setFilteredMatches(filtered)
  }, [searchTerm, selectedSubject, sortBy, matches])

  const handleConnect = (tutorId: string) => {
    if (!user) return

    createSession(
      user.role === "tutor" ? user.id : tutorId,
      user.role === "tutor" ? tutorId : user.id,
      user.subjects[0] || "General",
      new Date().toISOString(),
      new Date(Date.now() + 3600000).toISOString(),
    )

    setConnectedUsers([...connectedUsers, tutorId])
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const uniqueSubjects = Array.from(new Set(matches.flatMap((m) => m.user.subjects))).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in pt-16 md:pt-0">
          <h1 className="text-4xl font-bold mb-2">{user?.role === "tutor" ? "Find Students" : "Find Tutors"}</h1>
          <p className="text-muted-foreground">
            Discover {user?.role === "tutor" ? "students" : "tutors"} based on shared interests and compatibility
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 bg-card/50 border border-border/50 mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-xs font-medium">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-xs font-medium">
                Subject
              </Label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <Label htmlFor="sort" className="text-xs font-medium">
                Sort By
              </Label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "match" | "name")}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="match">Best Match</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-accent" />
                <span className="font-medium">{filteredMatches.length} results</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Grid */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match, idx) => (
              <div key={match.user.id} style={{ animationDelay: `${idx * 50}ms` }}>
                <TutorCard
                  tutor={match.user}
                  matchScore={match.score}
                  matchReasons={match.reasons}
                  onConnect={handleConnect}
                />
                {connectedUsers.includes(match.user.id) && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-accent font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Connected
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-card/50 border border-border/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <ArrowDown className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or come back later when more users join!
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedSubject("")
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </main>
    </div>
  )
}
