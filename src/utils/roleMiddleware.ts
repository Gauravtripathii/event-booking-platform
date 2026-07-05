import type { UserResponse } from "../types/userTypes";

export function roleMiddleware(
  currentUser: UserResponse | null,
  allowedRoles: Array<"USER" | "ADMIN">
): boolean {
  if (!currentUser) {
    console.warn("Access denied: No user logged in.");
    return false;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    console.warn(
      `Access denied: User role ${currentUser.role} not in allowed roles ${allowedRoles}`
    );
    return false;
  }

  return true;
}
