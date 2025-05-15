import Notification from "../models/notification.model.js";
import { handleError } from "../helpers/handleError.js";

// Fetch all notifications (admin)
export const getNotifications = async (req, res, next) => {
  try {
    let notifications;
    try {
      notifications = await Notification.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "post",
          populate: { path: "author", select: "name avatar" },
        })
        .lean();
      console.log("Notifications fetched (populated):", notifications);
    } catch (popErr) {
      notifications = await Notification.find().sort({ createdAt: -1 }).lean();
      console.log("Notifications fetched (unpopulated):", notifications);
    }
    res.status(200).json({ notifications: notifications || [] });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Mark a notification as read
export const markNotificationRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res
      .status(200)
      .json({ success: true, message: "Notification marked as read." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
