"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="pt-40 pb-15 md:pt-45 md:pb-10 lg:pb-15 pl-5 bg-[#fef4f4]">
      <div className="w-full max-w-md mx-auto">
        <SignIn path="/signin" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
}
