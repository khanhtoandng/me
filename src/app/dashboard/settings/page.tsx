"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    messageAlerts: true,
    activitySummary: false,
    securityAlerts: true,
  });

  const [deleteAccountForm, setDeleteAccountForm] = useState({
    otpCode: "",
    showOtpInput: false,
  });

  const [usernameForm, setUsernameForm] = useState({
    currentUsername: "Baraa Alshaer", // This would come from API
    newUsername: "",
    showConfirmation: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme || "system",
    compactMode: false,
    animationsEnabled: true,
  });

  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!usernameForm.newUsername.trim()) {
      setError("Username cannot be empty");
      setLoading(false);
      return;
    }

    if (usernameForm.newUsername.length < 2) {
      setError("Username must be at least 2 characters long");
      setLoading(false);
      return;
    }

    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsernameForm((prev) => ({
        ...prev,
        currentUsername: prev.newUsername,
        newUsername: "",
        showConfirmation: false,
      }));

      setSuccess("Username updated successfully");
      toast.success("Username updated successfully");
    } catch (error) {
      setError("Failed to update username");
      toast.error("Failed to update username");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      // setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      // setSuccess("Password changed successfully");
      toast.success("Password updated!");

      // Reset form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to change password",
      );
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    // In a real app, you would save this to the database
    toast.success(`${key} ${value ? "enabled" : "disabled"}`);
  };

  const handleAppearanceChange = (key: string, value: any) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "theme") {
      setTheme(value);
    }

    // In a real app, you would save this to the database
    toast.success(`Appearance setting updated`);
  };

  const handleDeleteAccountRequest = () => {
    setDeleteAccountForm((prev) => ({
      ...prev,
      showOtpInput: true,
    }));
    toast.info("Please enter the OTP code to confirm account deletion");
  };

  const handleDeleteAccount = async () => {
    if (!deleteAccountForm.otpCode) {
      toast.error("Please enter the OTP code");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpCode: deleteAccountForm.otpCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      toast.success("Account deleted successfully");

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteAccountForm({
      otpCode: "",
      showOtpInput: false,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-bold">Settings</h3>
        <p className="text-[var(--paragraph)]">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          {/* Username Management */}
          <Card>
            <CardHeader>
              <CardTitle>Username</CardTitle>
              <CardDescription>
                Change your display name and username
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleUsernameChange}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentUsername">Current Username</Label>
                  <Input
                    id="currentUsername"
                    type="text"
                    value={usernameForm.currentUsername}
                    disabled
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newUsername">New Username</Label>
                  <Input
                    id="newUsername"
                    type="text"
                    placeholder="Enter new username"
                    value={usernameForm.newUsername}
                    onChange={(e) =>
                      setUsernameForm((prev) => ({
                        ...prev,
                        newUsername: e.target.value,
                      }))
                    }
                    required
                  />
                  <p className="text-xs text-[var(--paragraph)]">
                    Username must be at least 2 characters long
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading || !usernameForm.newUsername.trim()}
                >
                  {loading ? "Updating..." : "Update Username"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Password Management */}
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <form
              className="bg-[var(--card-background)]"
              onSubmit={handlePasswordChange}
            >
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2 ">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Delete Account</Label>
                <p className="text-sm text-[var(--paragraph)]">
                  Permanently delete your account and all of your content. This
                  action cannot be undone.
                </p>
                {deleteAccountForm.showOtpInput && (
                  <div className="space-y-3 p-4 border border-red-500 rounded-[12px] ">
                    <div className="space-y-2">
                      <Label htmlFor="otpCode" className="text-red-800">
                        Enter OTP Code to Confirm Deletion
                      </Label>
                      <p className="text-sm text-red-600">
                        Please enter the OTP code "2132" to confirm account
                        deletion
                      </p>
                      <Input
                        id="otpCode"
                        type="text"
                        placeholder="Enter OTP code"
                        value={deleteAccountForm.otpCode}
                        onChange={(e) =>
                          setDeleteAccountForm((prev) => ({
                            ...prev,
                            otpCode: e.target.value,
                          }))
                        }
                        className="border-red-300 focus:border-red-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        size="sm"
                      >
                        {loading ? "Deleting..." : "Confirm Delete"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelDelete}
                        disabled={loading}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {!deleteAccountForm.showOtpInput ? (
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccountRequest}
                >
                  Delete Account
                </Button>
              ) : (
                <p className="text-sm text-red-600">
                  Please complete the verification above to delete your account
                </p>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the dashboard looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={
                      appearanceSettings.theme === "light"
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={
                      appearanceSettings.theme === "dark"
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={
                      appearanceSettings.theme === "system"
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleAppearanceChange("theme", "system")}
                  >
                    System
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-[var(--paragraph)]">
                      Use a more compact layout for the dashboard
                    </p>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={appearanceSettings.compactMode}
                    onCheckedChange={(checked) =>
                      handleAppearanceChange("compactMode", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-[var(--paragraph)]">
                      Enable animations and transitions
                    </p>
                  </div>
                  <Switch
                    id="animations"
                    checked={appearanceSettings.animationsEnabled}
                    onCheckedChange={(checked) =>
                      handleAppearanceChange("animationsEnabled", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-[var(--paragraph)]">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailNotifications", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="message-alerts">Message Alerts</Label>
                  <p className="text-sm text-[var(--paragraph)]">
                    Get notified when you receive new messages
                  </p>
                </div>
                <Switch
                  id="message-alerts"
                  checked={notificationSettings.messageAlerts}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("messageAlerts", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activity-summary">Activity Summary</Label>
                  <p className="text-sm text-[var(--paragraph)]">
                    Receive weekly activity summaries
                  </p>
                </div>
                <Switch
                  id="activity-summary"
                  checked={notificationSettings.activitySummary}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("activitySummary", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <p className="text-sm text-[var(--paragraph)]">
                    Get notified about security events
                  </p>
                </div>
                <Switch
                  id="security-alerts"
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("securityAlerts", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
