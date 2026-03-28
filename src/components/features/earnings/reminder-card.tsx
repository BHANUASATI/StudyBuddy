"use client"

import type { Reminder } from "@/src/lib/database/db-mock"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Clock, Trash2 } from "lucide-react"

interface ReminderCardProps {
  reminder: Reminder
  onDelete?: (id: string) => void
}

export function ReminderCard({ reminder, onDelete }: ReminderCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "session":
        return "bg-mint/10 text-mint border-mint/20"
      case "meeting":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-lavender/10 text-lavender border-lavender/20"
    }
  }

  return (
    <Card className="p-4 bg-card/50 border border-border/50 hover:border-accent/50 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold truncate">{reminder.title}</h4>
            <Badge className={`capitalize text-xs ${getTypeColor(reminder.type)}`}>{reminder.type}</Badge>
          </div>

          {reminder.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{reminder.description}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{reminder.time}</span>
            </div>
            <span>{new Date(reminder.date).toLocaleDateString()}</span>
          </div>
        </div>

        {onDelete && (
          <Button
            onClick={() => onDelete(reminder.id)}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
