"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { FlashcardViewer } from "@/src/components/features/flashcards/flashcard-viewer"
import { Button } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { getFlashcardsByUser, createFlashcard } from "@/src/lib/database/db-mock"
import { Plus, BookOpen, Sparkles } from "lucide-react"

export default function FlashcardsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [selectedSubject, setSelectedSubject] = useState("")
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [newSubject, setNewSubject] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      if (selectedSubject) {
        const cards = getFlashcardsByUser(user.id, selectedSubject)
        setFlashcards(cards || [])
      } else if (user.subjects && user.subjects.length > 0) {
        const cards = getFlashcardsByUser(user.id, user.subjects[0])
        setFlashcards(cards || [])
        setSelectedSubject(user.subjects[0])
      } else {
        setFlashcards([])
      }
    }
  }, [user, selectedSubject])

  const handleAddFlashcard = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !front.trim() || !back.trim()) return

    createFlashcard(user.id, selectedSubject || user.subjects[0], front, back)
    setFront("")
    setBack("")
    setIsOpen(false)

    // Refresh flashcards
    const cards = getFlashcardsByUser(user.id, selectedSubject)
    setFlashcards(cards)
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
            <BookOpen className="w-8 h-8 text-accent" />
            Flashcards
          </h1>
          <p className="text-muted-foreground">Create AI-generated flashcards for quick revision</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <div className="flex-1">
            <Label htmlFor="subject" className="text-xs font-medium mb-2 block">
              Select Subject
            </Label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              {(user?.subjects || []).map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Flashcard
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Create Flashcard
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddFlashcard} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="front">Question/Front</Label>
                    <Textarea
                      id="front"
                      placeholder="Enter the question or topic..."
                      value={front}
                      onChange={(e) => setFront(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="back">Answer/Back</Label>
                    <Textarea
                      id="back"
                      placeholder="Enter the answer or definition..."
                      value={back}
                      onChange={(e) => setBack(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Create Flashcard
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-slide-up">
          <FlashcardViewer flashcards={flashcards} onAddNew={() => setIsOpen(true)} />
        </div>
      </main>
    </div>
  )
}
