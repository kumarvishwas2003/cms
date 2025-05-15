import express from "express";
import {
  getNotifications,
  markNotificationRead,
} from "../controllers/Notification.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const NotificationRoute = express.Router();

NotificationRoute.get("/", authenticate, getNotifications);
NotificationRoute.put("/:id/read", authenticate, markNotificationRead);

export default NotificationRoute;
