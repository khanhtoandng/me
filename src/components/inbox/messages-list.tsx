"use client";

import { Label } from "@/components/ui/label";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Archive, Trash2, Star, Mail, MailOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Message = {
  _id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
  createdAt: string;
};

export function MessagesList() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let url = "/api/messages";
      const params = new URLSearchParams();

      if (filter === "unread") {
        params.set("read", "false");
      } else if (filter === "starred") {
        params.set("starred", "true");
      } else if (filter === "archived") {
        params.set("archived", "true");
      } else {
        params.set("archived", "false"); // By default, show non-archived messages
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter messages client-side for simplicity
    // In a real app, you might want to do this server-side
    if (searchQuery) {
      const filtered = messages.filter(
        (message) =>
          message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMessages(filtered);
    } else {
      fetchMessages();
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(
          messages.map((message) =>
            message._id === id ? { ...message, read: true } : message
          )
        );
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark message as read. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleStar = async (id: string) => {
    try {
      const message = messages.find((m) => m._id === id);
      if (!message) return;

      const response = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ starred: !message.starred }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(
          messages.map((message) =>
            message._id === id
              ? { ...message, starred: !message.starred }
              : message
          )
        );
      }
    } catch (error) {
      console.error("Error toggling star:", error);
      toast({
        title: "Error",
        description: "Failed to update message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleArchive = async () => {
    if (selectedMessages.length === 0) {
      toast({
        title: "Info",
        description: "Please select at least one message to archive.",
      });
      return;
    }

    try {
      const promises = selectedMessages.map((id) =>
        fetch(`/api/messages/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ archived: true }),
        })
      );

      await Promise.all(promises);

      toast({
        title: "Success",
        description: `${selectedMessages.length} message(s) archived.`,
      });

      setSelectedMessages([]);
      fetchMessages();
    } catch (error) {
      console.error("Error archiving messages:", error);
      toast({
        title: "Error",
        description: "Failed to archive messages. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (selectedMessages.length === 0) {
      toast({
        title: "Info",
        description: "Please select at least one message to delete.",
      });
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete ${selectedMessages.length} message(s)?`
      )
    ) {
      return;
    }

    try {
      const promises = selectedMessages.map((id) =>
        fetch(`/api/messages/${id}`, {
          method: "DELETE",
        })
      );

      await Promise.all(promises);

      toast({
        title: "Success",
        description: `${selectedMessages.length} message(s) deleted.`,
      });

      setSelectedMessages([]);
      fetchMessages();
    } catch (error) {
      console.error("Error deleting messages:", error);
      toast({
        title: "Error",
        description: "Failed to delete messages. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleSelectMessage = (id: string) => {
    setSelectedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((messageId) => messageId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map((message) => message._id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute hiddenh-4 w-4 text-[var(--paragraph)]" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="w-full bg-[var(--input-background)] border-[var(--input-border-color)] pl-8 text-[var(--input-text)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-[var(--card-border-color)] text-[var(--paragraph)]"
            onClick={handleArchive}
            disabled={selectedMessages.length === 0}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button
            variant="outline"
            className="border-[var(--card-border-color)] text-[var(--paragraph)]"
            onClick={handleDelete}
            disabled={selectedMessages.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)]">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Unread
          </TabsTrigger>
          <TabsTrigger
            value="starred"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Starred
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Archived
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle className="text-[var(--card-headline)]">
                Messages
              </CardTitle>
              <CardDescription className="text-[var(--card-paragraph)]">
                Messages from your portfolio contact form
              </CardDescription>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="select-all"
                className="border-[var(--input-border-color)]"
                checked={
                  selectedMessages.length === messages.length &&
                  messages.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
              <Label
                htmlFor="select-all"
                className="ml-2 text-[var(--card-paragraph)]"
              >
                Select All
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="divide-y divide-[var(--card-border-color)]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-4 bg-[var(--skeleton-color)] rounded animate-pulse" />
                    <div className="h-4 w-4 bg-[var(--skeleton-color)] rounded animate-pulse" />
                    <div className="h-4 w-4 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-[var(--skeleton-color)] rounded-full animate-pulse" />
                        <div>
                          <div className="h-4 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                          <div className="h-3 w-48 bg-[var(--skeleton-color)] rounded animate-pulse mt-1" />
                        </div>
                      </div>
                      <div className="h-3 w-16 bg-[var(--skeleton-color)] rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-64 bg-[var(--skeleton-color)] rounded animate-pulse mt-2" />
                    <div className="h-3 w-full bg-[var(--skeleton-color)] rounded animate-pulse mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[var(--card-headline)]">
                No messages found
              </h3>
              <p className="text-[var(--card-paragraph)] mt-2">
                {filter === "unread"
                  ? "You have no unread messages"
                  : filter === "starred"
                    ? "You have no starred messages"
                    : filter === "archived"
                      ? "You have no archived messages"
                      : "Your inbox is empty"}
              </p>
            </div>
          ) : (
            <motion.div
              className="divide-y divide-[var(--card-border-color)]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {messages.map((message) => (
                <motion.div
                  key={message._id}
                  className={`flex items-start gap-0 p-4 hover:bg-[var(--card-hover)] flex-row-reverse relative ${
                    !message.read ? "bg-[var(--card-background-effect)]" : ""
                  }`}
                  variants={itemVariants}
                  onClick={() => !message.read && handleMarkAsRead(message._id)}
                >
                  <div className="flex flex-row-reverse items-center gap-0">
                    <Checkbox
                      id={`select-${message._id}`}
                      className="border-[var(--input-border-color)] "
                      checked={selectedMessages.includes(message._id)}
                      onCheckedChange={() => toggleSelectMessage(message._id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${message.starred ? "text-yellow-400" : "text-[var(--paragraph)]"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStar(message._id);
                      }}
                    >
                      <Star
                        className="h-4 w-4 me-2"
                        fill={message.starred ? "currentColor" : "none"}
                      />
                      <span className="sr-only">Star</span>
                    </Button>
                    <div className="flex h-8 w-8 items-center justify-center">
                      {message.read ? (
                        <MailOpen className="h-4 w-4 text-[var(--paragraph)]" />
                      ) : (
                        <Mail className="h-4 w-4 text-[var(--button)]" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg"
                            alt={message.sender}
                          />
                          <AvatarFallback className="bg-[var(--button2)] text-[var(--button-text)]">
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              !message.read
                                ? "text-[var(--card-headline)]"
                                : "text-[var(--card-paragraph)]"
                            }`}
                          >
                            {message.sender}
                          </p>
                          <p className="text-xs text-[var(--card-paragraph)]">
                            {message.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs  right-0 absolute bottom-2 text-[var(--card-paragraph)]">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <h3
                      className={`mt-1 text-sm ${
                        !message.read
                          ? "font-medium text-[var(--card-headline)]"
                          : "text-[var(--card-paragraph)]"
                      }`}
                    >
                      {message.subject}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--card-paragraph)] line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
