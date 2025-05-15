import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/notification/", {
        withCredentials: true,
      });
      console.log("Fetched notifications from API:", res.data.notifications);
      setNotifications(
        Array.isArray(res.data.notifications) ? res.data.notifications : []
      );
    } catch (err) {
      setError("Failed to fetch notifications");
      setNotifications([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAction = async (blogId, action) => {
    try {
      await axios.put(
        `/api/blog/${action}/${blogId}`,
        {},
        { withCredentials: true }
      );
      await fetchNotifications();
    } catch (err) {
      alert("Action failed");
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>{error}</div>;

  console.log("Notifications to render:", notifications);

  return (
    <div>
      <h2>Admin Notifications</h2>
      {Array.isArray(notifications) && notifications.length === 0 && (
        <div>No notifications.</div>
      )}
      {(Array.isArray(notifications) ? notifications : []).map((notif) => (
        <Card key={notif._id} style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{notif.message}</strong>
              {notif.post && (
                <>
                  <div>Title: {notif.post.title}</div>
                  <div>Author: {notif.post.author?.name}</div>
                  <div>
                    Status: <Badge>{notif.post.status}</Badge>
                  </div>
                </>
              )}
              <div style={{ fontSize: 12, color: "#888" }}>
                {new Date(notif.createdAt).toLocaleString()}
              </div>
            </div>
            {notif.post && notif.post.status === "pending" && (
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => handleAction(notif.post._id, "approve")}>
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAction(notif.post._id, "deny")}
                >
                  Deny
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminNotifications;
