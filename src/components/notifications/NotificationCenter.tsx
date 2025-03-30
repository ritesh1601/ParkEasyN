import React, { useState } from "react";
import { Bell, X, Check, Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "booking" | "system" | "payment" | "reminder";
  title: string;
  message: string;
  time: Date;
  read: boolean;
  actionRequired?: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  onNotificationAction?: (id: string, action: "accept" | "decline") => void;
}

const NotificationCenter = ({
  notifications = defaultNotifications,
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onClearAll = () => {},
  onNotificationAction = () => {},
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "payment":
        return <Clock className="h-4 w-4 text-green-500" />;
      case "system":
        return <Bell className="h-4 w-4 text-yellow-500" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60),
      );
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="relative bg-white">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 md:w-96 z-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Notifications</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={onMarkAllAsRead}
                >
                  Mark all as read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={onClearAll}
                >
                  Clear all
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No notifications yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start p-3 rounded-md cursor-pointer transition-colors",
                      notification.read
                        ? "bg-background hover:bg-muted/50"
                        : "bg-muted/30 hover:bg-muted/50",
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      {notification.user ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              notification.user.avatar ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${notification.user.name}`
                            }
                            alt={notification.user.name}
                          />
                          <AvatarFallback>
                            {notification.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatTime(notification.time)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      {notification.actionRequired && (
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationAction(notification.id, "decline");
                            }}
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationAction(notification.id, "accept");
                            }}
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                    </div>
                    {!notification.read && (
                      <div className="ml-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Notification Detail Dialog */}
      <Dialog
        open={!!selectedNotification}
        onOpenChange={(open) => !open && setSelectedNotification(null)}
      >
        <DialogContent>
          {selectedNotification && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedNotification.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center">
                  {selectedNotification.user ? (
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={
                            selectedNotification.user.avatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedNotification.user.name}`
                          }
                          alt={selectedNotification.user.name}
                        />
                        <AvatarFallback>
                          {selectedNotification.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {selectedNotification.user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(selectedNotification.time)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        {getNotificationIcon(selectedNotification.type)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {selectedNotification.type.charAt(0).toUpperCase() +
                            selectedNotification.type.slice(1)}{" "}
                          Notification
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(selectedNotification.time)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-sm">{selectedNotification.message}</p>
                </div>
                {selectedNotification.actionRequired && (
                  <div className="flex space-x-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onNotificationAction(
                          selectedNotification.id,
                          "decline",
                        );
                        setSelectedNotification(null);
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button
                      onClick={() => {
                        onNotificationAction(selectedNotification.id, "accept");
                        setSelectedNotification(null);
                      }}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedNotification(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Default mock data
const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "New Booking Request",
    message:
      "John Doe wants to book your Downtown Parking spot on June 15th from 9 AM to 5 PM.",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionRequired: true,
    user: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message:
      "You've received a payment of $25.00 for your Downtown Parking spot booking.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "System Maintenance",
    message:
      "The system will be undergoing maintenance on June 20th from 2 AM to 4 AM. Some features may be unavailable during this time.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "4",
    type: "reminder",
    title: "Upcoming Booking",
    message:
      "Reminder: You have a booking for Riverside Parking tomorrow at 10 AM.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
  {
    id: "5",
    type: "booking",
    title: "Booking Modification",
    message:
      "Sarah Johnson has requested to modify her booking for City Center spot from 2 PM to 6 PM instead of 1 PM to 4 PM.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: false,
    actionRequired: true,
    user: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },
];

export default NotificationCenter;
