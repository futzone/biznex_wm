import { NextResponse } from "next/server";
import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Role = "ADMIN" | "WAREHOUSE_MANAGER" | "DEALER";

/**
 * Get the current server session with auth options pre-configured.
 */
export async function getSession() {
  return nextAuthGetServerSession(authOptions);
}

/**
 * Require authentication and optionally check for specific roles.
 * Returns the session if authorized, or a NextResponse error.
 */
export async function requireAuth(
  roles?: Role[]
): Promise<
  | { authorized: true; session: NonNullable<Awaited<ReturnType<typeof getSession>>> }
  | { authorized: false; response: NextResponse }
> {
  const session = await getSession();

  if (!session || !session.user) {
    return {
      authorized: false,
      response: errorResponse("Unauthorized", 401),
    };
  }

  if (roles && roles.length > 0) {
    const userRole = session.user.role as Role;
    if (!roles.includes(userRole)) {
      return {
        authorized: false,
        response: errorResponse("Forbidden", 403),
      };
    }
  }

  return { authorized: true, session };
}

/**
 * Format a successful JSON response.
 */
export function formatResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Format an error JSON response.
 */
export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}
