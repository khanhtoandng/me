import { ProfileForm } from "@/components/profile/profile-form";
import dbConnect from "@/lib/mongodb";
import Profile from "@/lib/models/profile";

export default async function ProfilePage() {
  await dbConnect();

  // Get the profile or create a default one if it doesn't exist
  const profile = await Profile.findOne({}).lean();

  let profileData;
  if (!profile) {
    profileData = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      avatar: "",
      skills: [],
    };
  } else {
    // Convert MongoDB document to plain object and handle _id
    profileData = JSON.parse(JSON.stringify(profile));
    if (profileData._id) {
      profileData.id = profileData._id;
      delete profileData._id;
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">Profile</h1>
      <ProfileForm profile={profileData} />
    </div>
  );
}
