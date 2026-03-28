import { getUserById, updateUser } from "@/src/lib/database/db-mock"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = getUserById(id)

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    const { password, ...userWithoutPassword } = user

    return new Response(JSON.stringify(userWithoutPassword))
  } catch (error: any) {
    console.error("[v0] Get user error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await request.json()

    delete updates.password

    const user = updateUser(id, updates)

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    const { password, ...userWithoutPassword } = user

    return new Response(JSON.stringify(userWithoutPassword))
  } catch (error: any) {
    console.error("[v0] Update user error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await request.json()

    delete updates.password

    const user = updateUser(id, updates)

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    const { password, ...userWithoutPassword } = user

    return new Response(JSON.stringify(userWithoutPassword))
  } catch (error: any) {
    console.error("[v0] Update user error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
