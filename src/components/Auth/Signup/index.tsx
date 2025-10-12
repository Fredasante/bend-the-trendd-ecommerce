"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center min-h-screen mt-40">
      <div className="w-full max-w-md bg-white mx-auto shadow-xl rounded-2xl ps-5 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create Your Account
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Join <span className="font-semibold">Bend the Trendd</span> and start
          shopping in style.
        </p>

        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/signin"
          appearance={{
            elements: {
              // Buttons
              formButtonPrimary:
                "bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg w-full",

              // Input fields
              formFieldInput:
                "border-gray-300 rounded-lg focus:ring-black focus:border-black",

              // Hide Clerk default headers
              headerTitle: "hidden",
              headerSubtitle: "hidden",

              // Social login buttons
              socialButtonsBlockButton:
                "w-full border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 mb-2",

              // Footer links
              footerActionLink: "text-black font-medium hover:underline",
            },
          }}
        />
      </div>
    </main>
  );
}
