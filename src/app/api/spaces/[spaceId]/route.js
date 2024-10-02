import { connectDb } from "@/lib/connectDb";
import Space from "@/models/Space";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDb();
  const { spaceId } = params;
  try {
    const space = await Space.findById(spaceId).lean();

    if (!space) {
      return NextResponse.status(404).json({ message: "Space not found." });
    }

    return NextResponse.json(space);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error." });
  }
}
