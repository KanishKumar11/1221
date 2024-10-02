import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";

export async function POST(req) {
  const { userId } = await req.json();
  await connectDb();

  try {
    // Find user by ID
    const user = await User.findById(userId);

    // If no user is found, return a 404 response
    if (!user) {
      return Response.json({ message: "User not found" });
    }
    return Response.json({ user });
  } catch (err) {
    return Response.json({ message: "An error occurred" });
  }
}
