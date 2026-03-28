"use client"

import type { User } from "@/src/lib/database/db-mock"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Star, MessageCircle, Calendar } from "lucide-react"

interface TutorCardProps {
  tutor: User
  matchScore?: number
  matchReasons?: string[]
  onConnect: (tutorId: string) => void
}

export function TutorCard({ tutor, matchScore, matchReasons, onConnect }: TutorCardProps) {
  return (
    <Card className="p-6 bg-card/50 border border-border/50 hover:border-accent/50 hover:bg-card/80 transition-all duration-300 animate-slide-up group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mint to-soft-blue flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-foreground">{tutor.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
            <p className="text-sm text-muted-foreground">Year {tutor.year}</p>
            {matchScore && (
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{matchScore}% Match</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">SUBJECTS</p>
        <div className="flex flex-wrap gap-2">
          {tutor.subjects.slice(0, 3).map((subject) => (
            <Badge key={subject} variant="secondary" className="text-xs">
              {subject}
            </Badge>
          ))}
          {tutor.subjects.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tutor.subjects.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Bio */}
      {tutor.bio && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tutor.bio}</p>}

      {/* Match Reasons */}
      {matchReasons && matchReasons.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs font-medium text-accent mb-2">Why this match:</p>
          <ul className="text-xs space-y-1 text-foreground">
            {matchReasons.map((reason, idx) => (
              <li key={idx}>• {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => onConnect(tutor.id)}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Connect
        </Button>
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 bg-transparent">
          <Calendar className="w-4 h-4" />
          Schedule
        </Button>
      </div>
    </Card>
  )
}
