import mongoose from "mongoose";

const UserSpaceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserSpace ||
  mongoose.model("UserSpace", UserSpaceSchema);
