"use client"

import { useState } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import type { Flashcard } from "@/src/lib/database/db-mock"
import { ChevronLeft, ChevronRight, RotateCcw, Plus } from "lucide-react"

interface FlashcardViewerProps {
  flashcards: Flashcard[]
  onAddNew?: () => void
}

export function FlashcardViewer({ flashcards, onAddNew }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const current = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  const handleNext = () => {
    setIsFlipped(false)
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    setIsFlipped(false)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1)
    handleNext()
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setCorrectCount(0)
  }

  if (flashcards.length === 0) {
    return (
      <Card className="p-12 text-center bg-card/50 border border-border/50">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <Plus className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-semibold mb-2">No Flashcards Yet</h3>
        <p className="text-muted-foreground mb-6">Create flashcards to start your revision!</p>
        {onAddNew && (
          <Button onClick={onAddNew} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Create Flashcard
          </Button>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span className="text-accent">
            {currentIndex + 1} / {flashcards.length}
          </span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-mint to-soft-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <Card
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-96 bg-gradient-to-br from-mint/10 to-soft-blue/10 border border-accent/20 flex items-center justify-center cursor-pointer group transition-all transform hover:scale-105 relative overflow-hidden"
      >
        {/* Flip animation */}
        <div
          className={`w-full h-full flex items-center justify-center p-8 transition-all duration-300 ${
            isFlipped ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
          style={{ pointerEvents: isFlipped ? "none" : "auto" }}
        >
          <div className="text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Front</Badge>
            <p className="text-2xl font-semibold text-balance">{current.front}</p>
            <p className="text-xs text-muted-foreground mt-4">Click to reveal answer</p>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 ${
            isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ pointerEvents: isFlipped ? "auto" : "none" }}
        >
          <div className="text-center">
            <Badge className="mb-4 bg-lavender/20 text-lavender border-lavender/30">Back</Badge>
            <p className="text-xl font-medium text-balance">{current.back}</p>
            <p className="text-xs text-muted-foreground mt-4">Click to flip back</p>
          </div>
        </div>

        {/* Click indicator */}
        <div className="absolute top-4 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          Click to flip
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <Card className="p-4 bg-card/50 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Correct</p>
          <p className="text-2xl font-bold text-accent">{correctCount}</p>
        </Card>
        <Card className="p-4 bg-card/50 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Remaining</p>
          <p className="text-2xl font-bold">{flashcards.length - currentIndex - 1}</p>
        </Card>
        <Card className="p-4 bg-card/50 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
          <p className="text-2xl font-bold text-accent">
            {flashcards.length > 0 ? Math.round((correctCount / (currentIndex + 1)) * 100) : 0}%
          </p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-between">
        <Button onClick={handlePrev} disabled={currentIndex === 0} variant="outline" className="flex-1 bg-transparent">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button onClick={handleReset} variant="ghost" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <Button onClick={handleCorrect} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
          Got It!
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="outline"
          className="flex-1 bg-transparent"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
