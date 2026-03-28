export async function POST(request: Request) {
  try {
    const { studentId, tutorId, subject } = await request.json()

    if (!studentId || !tutorId || !subject) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const match = {
      id: Math.random().toString(36).substr(2, 9),
      studentId,
      tutorId,
      subject,
      createdAt: new Date().toISOString(),
      status: "pending",
    }
    return new Response(JSON.stringify(match), { status: 201 })
  } catch (error: any) {
    console.error("[v0] Create match error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify([]))
  } catch (error: any) {
    console.error("[v0] Get matches error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
