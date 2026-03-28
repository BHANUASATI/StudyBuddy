"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { AIChatBox } from "@/src/components/features/ai-chat/ai-chat-box"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Lightbulb, Sparkles, Mic, Send, History, Bookmark, Zap, Clock, MessageSquare } from "lucide-react"

export default function AIChatPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const subjects = user?.subjects || ["Mathematics", "Physics", "Chemistry", "Biology"]
  const quickQuestions = [
    "Explain photosynthesis",
    "Help me solve this equation",
    "What is Newton's second law?",
    "Explain chemical bonds",
    "Help with calculus derivatives",
    "What is DNA replication?"
  ]

  const recentChats = [
    { subject: "Mathematics", question: "Help with quadratic equations", time: "2 hours ago" },
    { subject: "Physics", question: "Explain quantum mechanics basics", time: "1 day ago" },
    { subject: "Chemistry", question: "Balance chemical equations", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className={`mb-6 lg:mb-8 animate-fade-in pt-16 md:pt-0 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                AI Study Assistant 🤖
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Get instant answers to your questions with voice support
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" className="btn-hover-lavender rounded-xl">
                <History className="w-4 h-4 mr-2" />
                Chat History
              </Button>
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base btn-hover-accent rounded-xl">
                <Zap className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Subject Selector */}
        <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 mb-6 lg:mb-8 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Select Subject</h3>
              <p className="text-sm text-muted-foreground">Choose a subject for more focused help</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                  className={`${selectedSubject === subject ? 'bg-gradient-to-r from-mint to-soft-blue' : ''} btn-hover-accent rounded-lg`}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Chat */}
          <div className="xl:col-span-3 animate-slide-up">
            <Card className="h-[600px] sm:h-[700px] bg-card/50 border border-border/50 rounded-xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint to-soft-blue flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedSubject || "General"} • Online
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="btn-hover-lavender rounded-lg">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="btn-hover-coral rounded-lg">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint to-soft-blue flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-card/50 p-4 rounded-xl max-w-md">
                      <p className="text-sm">
                        Hi! I'm your AI study assistant. I can help you with {selectedSubject ? selectedSubject.toLowerCase() : 'any subject'}. What would you like to learn today?
                      </p>
                    </div>
                  </div>
                  
                  {/* Quick Questions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickQuestions.slice(0, 4).map((question, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start h-auto p-3 btn-hover-accent rounded-lg"
                      >
                        <span className="text-xs sm:text-sm">{question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 border-t border-border/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 border border-border/50 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                  />
                  <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground btn-hover-accent rounded-xl">
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="btn-hover-coral rounded-xl">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Features */}
            <Card
              className="p-4 sm:p-6 bg-gradient-to-br from-mint/10 to-soft-blue/10 border border-accent/20 animate-slide-up rounded-xl"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                Features
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Instant doubt solving</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Voice input support</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>AI-powered explanations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>24/7 availability</span>
                </li>
              </ul>
            </Card>

            {/* Recent Chats */}
            <Card
              className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up rounded-xl"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Recent Chats
              </h3>
              <div className="space-y-3">
                {recentChats.map((chat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {chat.subject}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm font-medium line-clamp-1">{chat.question}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 btn-hover-lavender rounded-lg">
                View All Chats
              </Button>
            </Card>

            {/* Tips */}
            <Card
              className="p-4 sm:p-6 bg-gradient-to-br from-lavender/5 to-coral/5 border border-accent/20 animate-slide-up rounded-xl"
              style={{ animationDelay: "300ms" }}
            >
              <h3 className="font-semibold mb-3 text-sm bg-gradient-to-r from-lavender via-coral to-mint bg-clip-text text-transparent">
                Pro Tips
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Ask specific questions for better answers</li>
                <li>• Use voice input for hands-free learning</li>
                <li>• Create flashcards from your learnings</li>
                <li>• Take screenshots for later reference</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
