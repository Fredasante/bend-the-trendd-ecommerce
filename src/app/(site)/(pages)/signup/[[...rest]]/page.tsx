import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup | Bend the Trendd",
  description: "Create your account to start shopping with Bend the Trendd",
  robots: {
    index: false,
    follow: false,
  },
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
