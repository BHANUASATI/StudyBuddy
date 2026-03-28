import { getAllUsers } from "@/src/lib/database/db-mock"

export async function GET(request: Request) {
  try {
    const users = getAllUsers()
    // Return filtered user data without passwords
    const usersWithoutPasswords = users.map(({ password, ...user }) => user)
    return new Response(JSON.stringify(usersWithoutPasswords))
  } catch (error: any) {
    console.error("[v0] Get users error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
