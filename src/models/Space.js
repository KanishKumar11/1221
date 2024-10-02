import mongoose from "mongoose";

const SpaceSchema = new mongoose.Schema(
  {
    spaceName: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserSpace" }],
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export default mongoose.models.Space || mongoose.model("Space", SpaceSchema);
