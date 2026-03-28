export async function authenticateToken(request: Request): Promise<string | null> {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }
    const token = authHeader.substring(7)
    return token
  } catch (error) {
    return null
  }
}
