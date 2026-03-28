/* Updated comment from StudyLink to Study Buddy */
/* Created smart matchmaking algorithm for Study Buddy */

import type { User } from "./db-mock"

export interface MatchScore {
  user: User
  score: number
  reasons: string[]
}

export const calculateMatchScore = (currentUser: User, targetUser: User): MatchScore => {
  let score = 0
  const reasons: string[] = []

  const userSubjects = currentUser.subjects || []
  const targetSubjects = targetUser.subjects || []

  // Same subjects (high priority)
  const commonSubjects = userSubjects.filter((s) => targetSubjects.includes(s))
  if (commonSubjects.length > 0) {
    score += commonSubjects.length * 30
    reasons.push(`${commonSubjects.length} common subjects`)
  }

  // Year difference (prefer close years)
  const yearDiff = Math.abs((currentUser.year || 1) - (targetUser.year || 1))
  if (yearDiff <= 1) {
    score += 20
    reasons.push("Same or adjacent year")
  }

  // Role compatibility
  if (
    (currentUser.role === "student" && targetUser.role === "tutor") ||
    (currentUser.role === "student" && targetUser.role === "both") ||
    (currentUser.role === "tutor" && targetUser.role === "student") ||
    (currentUser.role === "tutor" && targetUser.role === "both")
  ) {
    score += 25
    reasons.push("Compatible roles")
  }

  // Profile completeness bonus
  if (targetUser.bio && targetUser.bio.length > 20) {
    score += 15
    reasons.push("Complete profile")
  }

  return { user: targetUser, score, reasons }
}

export const findMatches = (currentUser: User, allUsers: User[]): MatchScore[] => {
  if (!currentUser || !allUsers || allUsers.length === 0) {
    return []
  }

  return allUsers
    .filter((user) => user.id !== currentUser.id) // Exclude self
    .map((user) => calculateMatchScore(currentUser, user))
    .sort((a, b) => b.score - a.score)
    .filter((match) => match.score > 0) // Only return meaningful matches
}
