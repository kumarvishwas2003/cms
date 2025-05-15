import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["new_post", "other"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema,
  "notifications"
);
export default Notification;
