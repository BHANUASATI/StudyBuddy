import { createReminder, getRemindersByUser, deleteReminder } from "@/src/lib/database/db-mock"

export async function POST(request: Request) {
  try {
    const { userId, title, description, date, time, type } = await request.json()

    if (!userId || !title || !date || !time) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const reminder = createReminder(userId, title, description || "", date, time, type)
    return new Response(JSON.stringify(reminder), { status: 201 })
  } catch (error: any) {
    console.error("[v0] Create reminder error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId required" }), { status: 400 })
    }

    const reminders = getRemindersByUser(userId)
    return new Response(JSON.stringify(reminders))
  } catch (error: any) {
    console.error("[v0] Get reminders error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return new Response(JSON.stringify({ error: "id required" }), { status: 400 })
    }

    const success = deleteReminder(id)
    return new Response(JSON.stringify({ success }))
  } catch (error: any) {
    console.error("[v0] Delete reminder error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
