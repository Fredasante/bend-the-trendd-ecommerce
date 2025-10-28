"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useUser();

  const allowedEmails = ["kooyaw55@gmail.com"];

  if (
    user &&
    !allowedEmails.includes(user.primaryEmailAddress?.emailAddress || "")
  ) {
    return (
      <div className="bg-gray-2 flex items-center justify-center px-4 py-20 mt-30 lg:mt-40 mb-auto lg:min-h-[60vh]">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-light-6 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-red" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-3">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page. This area is
            restricted to administrators only.
          </p>
          <Link
            href="/"
            className="inline-block font-medium text-white bg-blue py-3 px-8 rounded-lg ease-out duration-200 hover:bg-blue-dark"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <NextStudio config={config} />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
