import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import Song from "@/models/Song";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, artist, coverUrl, spotifyUrl, comment, spaceId } =
    await req.json();
  try {
    // Ensure spaceId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
      return NextResponse.json({ error: "Invalid spaceId" }, { status: 400 });
    }

    const song = await Song.create({
      title,
      artist,
      coverUrl,
      spotifyUrl,
      comment,
      user: new mongoose.Types.ObjectId(session.user.id),
      space: new mongoose.Types.ObjectId(spaceId),
    });

    return NextResponse.json(song);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create song" },
      { status: 500 }
    );
  }
}
