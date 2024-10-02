import { NextResponse } from "next/server";
import Space from "@/models/Space";
import User from "@/models/User"; // Import User model
import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";

export async function POST(req) {
  await connectDb();
  // Get the session
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { error: "Space name is required and must be a valid string." },
      { status: 400 }
    );
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email: session.user.email });

    // If the user does not exist, you might want to create one or handle this case
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    // Create a new space with the user's ID
    const space = await Space.create({
      spaceName: name.trim(),
      users: [user._id], // Use the user ID from the found user
    });

    return NextResponse.json(
      {
        success: true,
        message: "Space successfully created.",
        data: space,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create space. Please try again later." },
      { status: 500 }
    );
  }
}
