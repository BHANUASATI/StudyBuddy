import { createFlashcard, getFlashcardsByUser, deleteFlashcard } from "@/src/lib/database/db-mock"
import { authenticateToken } from "@/src/lib/auth/auth-middleware"

export async function POST(request: Request) {
  try {
    const { userId, subject, front, back } = await request.json()

    if (!userId || !subject || !front || !back) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const flashcard = createFlashcard(userId, subject, front, back)
    return new Response(JSON.stringify(flashcard), { status: 201 })
  } catch (error: any) {
    console.error("[v0] Create flashcard error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    const subject = url.searchParams.get("subject")

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId required" }), { status: 400 })
    }

    const flashcards = getFlashcardsByUser(userId, subject || undefined)
    return new Response(JSON.stringify(flashcards))
  } catch (error: any) {
    console.error("[v0] Get flashcards error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await authenticateToken(request)

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing flashcard ID" }), { status: 400 })
    }

    await deleteFlashcard(id)
    return new Response(JSON.stringify({ success: true }))
  } catch (error: any) {
    console.error("[v0] Delete flashcard error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
