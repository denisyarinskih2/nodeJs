import { User } from "../../models";

export async function checkAuthorization(
  authorizationId: string
): Promise<boolean> {
  try {
    const user = await User.findOne({ _id: authorizationId });

    return !!user;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("buffering timed out")
    ) {
      console.error("Database query timed out:", error);
      return false;
    } else {
      console.error("Error checking authorization:", error);
      return false;
    }
  }
}
