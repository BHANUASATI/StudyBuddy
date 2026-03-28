import { getUserByEmail } from "@/src/lib/database/db-mock"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 })
    }

    const user = getUserByEmail(email)

    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user

    return new Response(
      JSON.stringify({
        user: userWithoutPassword,
        token: user.id,
      }),
    )
  } catch (error: any) {
    console.error("[v0] Login error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
