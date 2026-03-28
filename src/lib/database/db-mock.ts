/* Updated comment from StudyLink to Study Buddy */
/* Created mock database for Study Buddy users and data */

export interface User {
  id: string
  email: string
  name: string
  password: string // In production, use hashed passwords
  role: "student" | "tutor" | "both"
  year: number
  subjects: string[]
  skills: string[]
  availability: {
    day: string
    timeSlots: string[]
  }[]
  bio: string
  avatar: string
  joinedAt: string
  createdAt: string
}

export interface StudySession {
  id: string
  tutor: string
  student: string
  subject: string
  startTime: string
  endTime: string
  status: "scheduled" | "completed" | "cancelled"
}

export interface Reminder {
  id: string
  userId: string
  title: string
  description: string
  date: string
  time: string
  type: "deadline" | "session" | "meeting" | "other"
}

export interface Flashcard {
  id: string
  userId: string
  subject: string
  front: string
  back: string
  createdAt: string
}

// Mock database
const users: User[] = [
  {
    id: "demo-student-1",
    email: "student@demo.com",
    name: "Alice Johnson",
    password: "password123",
    role: "student",
    year: 2,
    subjects: ["Mathematics", "Physics"],
    skills: ["Problem Solving"],
    availability: [
      { day: "Monday", timeSlots: ["3-4pm", "5-6pm"] },
      { day: "Wednesday", timeSlots: ["4-5pm"] },
    ],
    bio: "Computer Science student looking for help with math",
    avatar: "/placeholder-user.jpg",
    joinedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-tutor-1",
    email: "tutor@demo.com",
    name: "Bob Smith",
    password: "password123",
    role: "tutor",
    year: 4,
    subjects: ["Mathematics", "Chemistry"],
    skills: ["Teaching", "Mentoring"],
    availability: [
      { day: "Monday", timeSlots: ["2-4pm"] },
      { day: "Thursday", timeSlots: ["3-5pm"] },
    ],
    bio: "Final year student with 2 years of tutoring experience",
    avatar: "/placeholder-user.jpg",
    joinedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]
const sessions: StudySession[] = []
const reminders: Reminder[] = []
const flashcards: Flashcard[] = []

// User functions
export const createUser = (email: string, name: string, password: string): User => {
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    password, // Note: In production, hash this
    role: "student",
    year: 1,
    subjects: [],
    skills: [],
    availability: [],
    bio: "",
    avatar: "/placeholder-user.jpg",
    joinedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  return user
}

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((u) => u.email === email)
}

export const getUserById = (id: string): User | undefined => {
  return users.find((u) => u.id === id)
}

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const user = users.find((u) => u.id === id)
  if (!user) return null
  Object.assign(user, updates)
  return user
}

export const getAllUsers = (): User[] => {
  return users
}

// Study Session functions
export const createSession = (
  tutor: string,
  student: string,
  subject: string,
  startTime: string,
  endTime: string,
): StudySession => {
  const session: StudySession = {
    id: Math.random().toString(36).substr(2, 9),
    tutor,
    student,
    subject,
    startTime,
    endTime,
    status: "scheduled",
  }
  sessions.push(session)
  return session
}

export const getSessionsByUser = (userId: string): StudySession[] => {
  return sessions.filter((s) => s.tutor === userId || s.student === userId)
}

// Reminder functions
export const createReminder = (
  userId: string,
  title: string,
  description: string,
  date: string,
  time: string,
  type: "deadline" | "session" | "meeting" | "other",
): Reminder => {
  const reminder: Reminder = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    title,
    description,
    date,
    time,
    type,
  }
  reminders.push(reminder)
  return reminder
}

export const getRemindersByUser = (userId: string): Reminder[] => {
  return reminders.filter((r) => r.userId === userId)
}

export const deleteReminder = (id: string): boolean => {
  const index = reminders.findIndex((r) => r.id === id)
  if (index > -1) {
    reminders.splice(index, 1)
    return true
  }
  return false
}

// Flashcard functions
export const createFlashcard = (userId: string, subject: string, front: string, back: string): Flashcard => {
  const flashcard: Flashcard = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    subject,
    front,
    back,
    createdAt: new Date().toISOString(),
  }
  flashcards.push(flashcard)
  return flashcard
}

export const getFlashcardsByUser = (userId: string, subject?: string): Flashcard[] => {
  return flashcards.filter((f) => f.userId === userId && (!subject || f.subject === subject))
}

export const deleteFlashcard = (id: string): boolean => {
  const index = flashcards.findIndex((f) => f.id === id)
  if (index > -1) {
    flashcards.splice(index, 1)
    return true
  }
  return false
}
