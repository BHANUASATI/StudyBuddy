"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { CalendarView } from "@/src/components/features/calendar/calendar-view"
import { ReminderCard } from "@/src/components/features/earnings/reminder-card"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { getRemindersByUser, createReminder, deleteReminder, getSessionsByUser } from "@/src/lib/database/db-mock"
import { Calendar, Plus } from "lucide-react"

export default function CalendarPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [reminders, setReminders] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(selectedDate)
  const [time, setTime] = useState("09:00")
  const [type, setType] = useState<"deadline" | "session" | "meeting" | "other">("other")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setReminders(getRemindersByUser(user.id))
      setSessions(getSessionsByUser(user.id))
    }
  }, [user])

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim()) return

    createReminder(user.id, title, description, date, time, type)
    setReminders(getRemindersByUser(user.id))
    setTitle("")
    setDescription("")
    setTime("09:00")
    setType("other")
    setIsOpen(false)
  }

  const handleDeleteReminder = (id: string) => {
    deleteReminder(id)
    setReminders(getRemindersByUser(user?.id || ""))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const selectedDateReminders = reminders
    .filter((r) => r.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time))
  const allUpcoming = [...reminders, ...sessions]
    .sort((a: any, b: any) => {
      const aDate = new Date(`${a.date}T${a.time || "00:00"}`)
      const bDate = new Date(`${b.date}T${b.time || "00:00"}`)
      return aDate.getTime() - bDate.getTime()
    })
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in pt-16 md:pt-0">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-accent" />
            Study Calendar
          </h1>
          <p className="text-muted-foreground">Manage your study sessions, deadlines, and reminders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 animate-slide-up">
            <CalendarView
              events={reminders.map((r) => ({
                date: r.date,
                title: r.title,
                type: r.type as any,
                time: r.time,
              }))}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* Add Reminder Button */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Reminder</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddReminder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Math Exam"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Add details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                    >
                      <option value="deadline">Deadline</option>
                      <option value="session">Study Session</option>
                      <option value="meeting">Meeting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Create Reminder
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Selected Date Reminders */}
        <div className="mt-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-bold mb-4">
            {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h2>

          {selectedDateReminders.length > 0 ? (
            <div className="space-y-3">
              {selectedDateReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} onDelete={handleDeleteReminder} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-card/50 border border-border/50">
              <p className="text-muted-foreground">No reminders for this date</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setDate(selectedDate)
                  setIsOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </Card>
          )}
        </div>

        {/* Upcoming Reminders */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          {allUpcoming.length > 0 ? (
            <div className="space-y-3">
              {allUpcoming.map((item, idx) => (
                <ReminderCard
                  key={idx}
                  reminder={item}
                  onDelete={item.id && "id" in item ? handleDeleteReminder : undefined}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-card/50 border border-border/50">
              <p className="text-muted-foreground">No upcoming events</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
