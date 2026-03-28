import { authenticateToken } from "@/src/lib/auth/auth-middleware"

export async function POST(request: Request) {
  try {
    const userId = await authenticateToken(request)

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const { message, aiResponse } = await request.json()

    if (!message || !aiResponse) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const chat = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      aiResponse,
      createdAt: new Date().toISOString(),
    }
    return new Response(JSON.stringify(chat), { status: 201 })
  } catch (error: any) {
    console.error("[v0] Create chat error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const userId = await authenticateToken(request)

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    return new Response(JSON.stringify([]))
  } catch (error: any) {
    console.error("[v0] Get chats error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
