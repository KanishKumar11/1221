import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    coverUrl: { type: String, required: true },
    spotifyUrl: { type: String, required: true },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    space: { type: mongoose.Schema.Types.ObjectId, ref: "Space" },
  },
  { timestamps: true }
);
export default mongoose.models.Song || mongoose.model("Song", SongSchema);
