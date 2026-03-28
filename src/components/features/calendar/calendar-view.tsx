"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarEvent {
  date: string
  title: string
  type: "session" | "deadline" | "reminder" | "meeting"
  time?: string
}

interface CalendarViewProps {
  events: CalendarEvent[]
  onDateSelect?: (date: string) => void
}

export function CalendarView({ events, onDateSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0)

  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    setFirstDayOfWeek(firstDay.getDay())
    setDaysInMonth(Array.from({ length: lastDay.getDate() }, (_, i) => i + 1))
  }, [currentDate])

  const hasEvent = (day: number): CalendarEvent | undefined => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split("T")[0]
    return events.find((e) => e.date === dateStr)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "session":
        return "from-mint to-soft-blue"
      case "deadline":
        return "from-destructive to-destructive/80"
      case "meeting":
        return "from-accent to-accent/80"
      default:
        return "from-lavender to-lavender/80"
    }
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <Card className="p-6 bg-card/50 border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">{monthName}</h3>
        <div className="flex gap-2">
          <Button onClick={handlePrevMonth} variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button onClick={handleNextMonth} variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days of month */}
        {daysInMonth.map((day) => {
          const event = hasEvent(day)
          return (
            <button
              key={day}
              onClick={() => {
                const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                  .toISOString()
                  .split("T")[0]
                onDateSelect?.(dateStr)
              }}
              className={`aspect-square rounded-lg border-2 p-1 text-xs font-medium transition-all hover:border-accent/50 ${
                event
                  ? `border-accent/20 bg-gradient-to-br ${getEventColor(event.type)}`
                  : "border-border/50 hover:bg-background/50"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-foreground">{day}</span>
                {event && <div className="w-1 h-1 rounded-full bg-accent mt-1" />}
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
