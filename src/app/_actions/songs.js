"use server";
import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import Song from "@/models/Song";
import mongoose from "mongoose";

export async function fetchAllSongs({ spaceId }) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }
    await connectDb();

    console.log("Fetching songs for spaceId:", spaceId);

    // Ensure spaceId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
      throw new Error("Invalid spaceId");
    }
    const spaceObjectId = new mongoose.Types.ObjectId(spaceId);

    const songs = await Song.find({
      space: spaceObjectId,
    })
      .sort({ createdAt: -1 })
      .lean();

    console.log("Raw songs from database:", songs);
    console.log("Number of songs found:", songs.length);

    // Convert ObjectId to string for all songs
    const processedSongs = songs.map((song) => ({
      ...song,
      _id: song._id.toString(),
      user: song.user ? song.user.toString() : null,
      space: song.space ? song.space.toString() : null,
    }));

    console.log("Processed songs:", processedSongs);
    console.log("Number of processed songs:", processedSongs.length);

    return processedSongs;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    throw new Error("Failed to fetch songs");
  }
}

export async function fetchRecentSongs({ spaceId }) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }
    await connectDb();

    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
      throw new Error("Invalid spaceId");
    }
    const spaceObjectId = new mongoose.Types.ObjectId(spaceId);
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const songs = await Song.find({
      space: spaceObjectId,
      createdAt: { $gte: yesterday },
    })
      .sort({ createdAt: -1 })
      .lean();

    const processedSongs = songs.map((song) => ({
      ...song,
      _id: song._id.toString(),
      user: song.user ? song.user.toString() : null,
      space: song.space ? song.space.toString() : null,
    }));
    console.log("recent");
    console.log(processedSongs);

    return processedSongs;
  } catch (error) {
    throw new Error("Failed to fetch recent songs");
  }
}
