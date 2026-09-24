// src/app/dashboard/profile/page.tsx

import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import authOptions from "@/lib/authOptions";
import ProfileForm from "@/components/profile/ProfileForm";
import Reveal from "@/components/motion/Reveal";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/profile");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-card px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-primary">
            Profile Settings
          </h1>
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <ProfileForm name={session.user.name ?? ""} email={session.user.email ?? ""} />
        </Reveal>
      </div>
    </main>
  );
};

export default ProfilePage;
