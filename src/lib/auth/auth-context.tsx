"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./db-mock"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, name: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem("studybuddy_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In production, this would call an API endpoint
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).catch(() => null)

    if (response?.ok) {
      const data = await response.json()
      const userData = data.user
      setUser(userData)
      localStorage.setItem("studybuddy_user", JSON.stringify(userData))
    } else {
      throw new Error("Invalid credentials")
    }
    setIsLoading(false)
  }

  const signup = async (email: string, name: string, password: string) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    }).catch(() => null)

    if (response?.ok) {
      const data = await response.json()
      const userData = data.user
      setUser(userData)
      localStorage.setItem("studybuddy_user", JSON.stringify(userData))
    } else {
      throw new Error("Signup failed")
    }
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("studybuddy_user")
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error("Not authenticated")
    setIsLoading(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch(() => null)

    if (response?.ok) {
      const updatedUser = await response.json()
      setUser(updatedUser)
      localStorage.setItem("studybuddy_user", JSON.stringify(updatedUser))
    } else {
      throw new Error("Update failed")
    }
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
