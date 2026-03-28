import { createUser, getUserByEmail } from "@/src/lib/database/db-mock"

export async function POST(request: Request) {
  try {
    const { email, name, password, role = "student" } = await request.json()

    if (!email || !name || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const existingUser = getUserByEmail(email)
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 400 })
    }

    const user = createUser(email, name, password, role)

    const { password: _, ...userWithoutPassword } = user

    return new Response(
      JSON.stringify({
        user: userWithoutPassword,
        token: user.id,
      }),
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Signup error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
}
