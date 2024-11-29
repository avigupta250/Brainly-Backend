import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "videp", "article", "audio","youtube","twitter"],
      required: true,
    },
    tags: [
     { type: mongoose.Types.ObjectId,
      ref: "Tag",}
    ],
    link: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:true
    },
  },
  { timestamps: true }
);



export const Content=mongoose.model("Content",ContentSchema);