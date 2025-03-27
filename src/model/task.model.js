import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required."],
    },
    title: {
      type: String,
      required: [true, "title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required."],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: [true, "priority is required."],
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      required: [true, "status is required."],
    },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
