"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomDialog } from "@/components/ui/custom-dialog";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  MoreVertical,
  Mail,
  MailOpen,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "message" | "system" | "success" | "warning" | "error";
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

interface NotificationsManagerProps {
  notifications: Notification[];
  onMarkAsRead: (ids: string[]) => Promise<void>;
  onMarkAllAsRead: () => Promise<void>;
  onDelete: (ids: string[]) => Promise<void>;
  onClearAll: () => Promise<void>;
  loading?: boolean;
}

export function NotificationsManager({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  loading = false,
}: NotificationsManagerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const allSelected = selectedIds.length === notifications.length;
  const someSelected = selectedIds.length > 0;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <Mail className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map((n) => n.id));
    }
  };

  const handleSelectNotification = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const handleMarkSelectedAsRead = async () => {
    try {
      await onMarkAsRead(selectedIds);
      setSelectedIds([]);
      toast.success(`Marked ${selectedIds.length} notifications as read`);
    } catch (error) {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await onMarkAllAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await onDelete(selectedIds);
      setSelectedIds([]);
      setShowDeleteDialog(false);
      toast.success(`Deleted ${selectedIds.length} notifications`);
    } catch (error) {
      toast.error("Failed to delete notifications");
    }
  };

  const handleClearAll = async () => {
    try {
      await onClearAll();
      setSelectedIds([]);
      setShowClearDialog(false);
      toast.success("All notifications cleared");
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };

  return (
    <>
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[var(--card-headline)] flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-[var(--card-paragraph)]">
                Manage your notifications and messages
              </CardDescription>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-2">
              {someSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkSelectedAsRead}
                    disabled={loading}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Read ({selectedIds.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete ({selectedIds.length})
                  </Button>
                </motion.div>
              )}

              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={loading}
                >
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Mark All Read
                </Button>
              )}

              {notifications.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearDialog(true)}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-[var(--card-paragraph)]">No notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Select All Checkbox */}
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--card-border-color)]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  disabled={loading}
                />
                <span className="text-sm text-[var(--card-paragraph)]">
                  Select all ({notifications.length})
                </span>
              </div>

              {/* Notifications List */}
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`
                      flex items-start gap-3 p-3 rounded-[12px] border transition-colors
                      ${
                        notification.read
                          ? "bg-[var(--card-background-effect)] border-[var(--card-border-color)]"
                          : "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
                      }
                      ${
                        selectedIds.includes(notification.id)
                          ? "ring-2 ring-blue-500"
                          : ""
                      }
                    `}
                  >
                    <Checkbox
                      checked={selectedIds.includes(notification.id)}
                      onCheckedChange={() =>
                        handleSelectNotification(notification.id)
                      }
                      disabled={loading}
                    />

                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4
                            className={`
                            text-sm font-medium
                            ${
                              notification.read
                                ? "text-[var(--card-paragraph)]"
                                : "text-[var(--card-headline)]"
                            }
                          `}
                          >
                            {notification.title}
                          </h4>
                          <p className="text-sm text-[var(--card-paragraph)] mt-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-[var(--card-paragraph)] mt-2">
                            {new Date(
                              notification.createdAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {notification.read && (
                            <MailOpen className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clear All Dialog */}
      <CustomDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClearAll}
        title="Clear All Notifications"
        description="Are you sure you want to clear all notifications? This action cannot be undone."
        confirmText="Clear All"
        confirmVariant="destructive"
        isLoading={loading}
      />

      {/* Delete Selected Dialog */}
      <CustomDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteSelected}
        title="Delete Selected Notifications"
        description={`Are you sure you want to delete ${selectedIds.length} selected notifications? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        isLoading={loading}
      />
    </>
  );
}
