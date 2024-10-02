import { NextResponse } from "next/server";
import Space from "@/models/Space";
import { auth } from "@/auth"; // Auth method
import { connectDb } from "@/lib/connectDb";

export async function POST(req, { params }) {
  // Connect to MongoDB
  await connectDb();

  // Get the session
  const session = await auth(); // Assuming this returns the correct session
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { spaceId } = params;

  try {
    // Update the space and add the user to the users array using Mongoose
    const space = await Space.findByIdAndUpdate(
      spaceId,
      { $addToSet: { users: session.user.id } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated document
    );

    if (!space) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    return NextResponse.json(space);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update space" },
      { status: 500 }
    );
  }
}
