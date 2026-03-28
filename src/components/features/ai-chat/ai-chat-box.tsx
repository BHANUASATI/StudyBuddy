"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Send, Mic, MicOff, Loader } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatBoxProps {
  subject?: string
}

export function AIChatBox({ subject = "General" }: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("")
        setInput(transcript)
      }
    }
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate AI response (in production, call your AI API)
  const generateAIResponse = (userMessage: string): string => {
    const responses: { [key: string]: string[] } = {
      math: [
        "To solve this, let me break it down step by step: First, identify the key concepts...",
        "This is a common problem! Try using the formula: a² + b² = c². Here's how to apply it...",
        "Great question! Let me explain the concept with an example...",
      ],
      science: [
        "This relates to fundamental principles of physics. Here's what you need to know...",
        "Excellent question about chemistry! The key is understanding molecular bonds...",
        "In biology, this is related to cellular processes. Let me explain...",
      ],
      default: [
        "That's a great question! Let me help you understand this concept...",
        "I can help you with that! Here's what you need to know...",
        "Interesting! Let me break this down for you step by step...",
      ],
    }

    const category = subject.toLowerCase().includes("math")
      ? "math"
      : subject.toLowerCase().includes("science")
        ? "science"
        : "default"
    const responseList = responses[category] || responses.default
    return responseList[Math.floor(Math.random() * responseList.length)]
  }

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateAIResponse(input),
      sender: "ai",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)

    // Speak response if enabled
    if ((window as any).speechSynthesis) {
      speak(aiResponse.text)
    }
  }

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
      } else {
        recognitionRef.current.start()
      }
    }
  }

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    ;(window as any).speechSynthesis.speak(utterance)
  }

  return (
    <Card className="h-full flex flex-col bg-card/50 border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold">Ask Study Buddy AI</h3>
        <p className="text-xs text-muted-foreground">{subject}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mint to-soft-blue flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h4 className="font-semibold mb-2">Ask me anything!</h4>
            <p className="text-xs text-muted-foreground">Get instant help with your doubts about {subject}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user" ? "bg-accent text-accent-foreground" : "bg-background border border-border"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-background border border-border">
              <Loader className="w-4 h-4 animate-spin text-accent" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 space-y-3">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend()
            }}
            placeholder="Type your question..."
            className="text-sm"
          />
          <Button
            onClick={handleVoiceInput}
            variant="outline"
            size="sm"
            className={isListening ? "border-accent bg-accent/10" : ""}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {isSpeaking ? "🔊 Speaking..." : isListening ? "🎤 Listening..." : "Click the mic to use voice input"}
        </p>
      </div>
    </Card>
  )
}
