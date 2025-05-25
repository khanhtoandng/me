import { ProfileForm } from "@/components/profile/profile-form";

// Force dynamic rendering - don't statically generate this page
export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">Profile</h1>
      <ProfileForm />
    </div>
  );
}
